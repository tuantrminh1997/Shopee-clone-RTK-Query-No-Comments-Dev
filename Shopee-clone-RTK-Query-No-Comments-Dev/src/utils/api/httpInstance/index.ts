/* eslint-disable @typescript-eslint/no-explicit-any */
// axios
import axios, { AxiosResponse, AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
// react toastify:
import { toast } from "react-toastify";
// types:
import { RefreshTokenResponseType, AuthenticationSuccessResponse, User, ErrorResponseApi } from "src/types";
// utils authentication:
import {
	// access token
	saveAccessTokenToLocalStorage,
	clearAccessTokenFromLocalStorage,
	getAccessTokenFromLocalStorage,
	// user profile
	saveUserProfileToLocalStorage,
	clearUserProfileFromLocalStorage,
	// refresh_token:
	saveRefreshTokenToLocalStorage,
	clearRefreshTokenFromLocalStorage,
	getRefreshTokenFromLocalStorage,
	// event target, event message clear local storage:
	clearLocalStorageEventTarget,
	clearAccessTokenUserProfileEvent,
	// type predicate:
	isAxiosUnauthorizedError,
	isNotUnprocessableEntityError,
	isAxiosExpiredTokenError,
} from "src/utils";
// paths constants:
import {
	paths,
	// API URLs
	loginPathURL,
	registerPathURL,
	refreshTokenPathURL,
	logoutPathURL,
} from "src/constants";

class Http {
	instance: AxiosInstance;
	private accessToken: string;
	private refreshToken: string;
	private refreshTokenRequest: Promise<string> | null;
	private async handleRefreshTokenAutomatically() {
		try {
			const response = await this.instance.post<RefreshTokenResponseType>(refreshTokenPathURL, {
				refresh_token: this.refreshToken as string,
			});
			const { access_token: accessToken } = (response as AxiosResponse<RefreshTokenResponseType>).data.data as {
				access_token: string;
			};
			saveRefreshTokenToLocalStorage(accessToken as string);
			this.accessToken = accessToken as string;
			return accessToken as string;
		} catch (error) {
			// -> logout:
			this.accessToken = "";
			this.refreshToken = "";
			clearAccessTokenFromLocalStorage();
			clearUserProfileFromLocalStorage();
			clearRefreshTokenFromLocalStorage();
		}
	}
	constructor() {
		this.accessToken = getAccessTokenFromLocalStorage();
		this.refreshToken = getRefreshTokenFromLocalStorage();
		this.refreshTokenRequest = null;
		this.instance = axios.create({
			baseURL: paths.baseURL,
			timeout: 5000,
			headers: {
				"Content-Type": "application/json",
				"expire-access-token": 60 * 5,
				"expire-refresh-token": 60 * 60,
			},
		});
		this.instance.interceptors.request.use(
			// 1. Trong hàm config, kiểm tra xem access token (this.accessToken) đã được định nghĩa và tồn tại.
			(successRequest) => {
				if (this.accessToken && successRequest.headers) {
					successRequest.headers.authorization = this.accessToken;
					return successRequest;
				}
				// 2. Nếu không có access token hoặc config.headers không tồn tại, không làm gì và chỉ trả về config ban đầu. Điều này đảm bảo rằng
				// các yêu cầu không đi kèm với access token nếu người dùng chưa đăng nhập.
				return successRequest;
			},
			// 3. Trong trường hợp có lỗi xảy ra - cụ thể là trong trường hợp xảy ra lỗi khi tạo request và request đó vẫn chưa được gửi đi,
			//  sử dụng error để tạo một promise bị reject, giữ nguyên lỗi và chuyển nó ra ngoài để được xử lý bởi các interceptor hoặc mã gọi yêu
			// cầu HTTP khác, nếu có.
			(errorRequest) => {
				return Promise.reject(errorRequest);
			},
		);
		// Interceptor xử lý phản hồi từ máy chủ sau khi gửi yêu cầu HTTP từ phía ứng dụng. Nó có hai phần chính:
		this.instance.interceptors.response.use(
			// Callback Interceptor cho response khi thực hiện tác vụ call API thành công: Khi máy chủ trả về một phản hồi thành công sau khi thực
			// hiện một tác vụ API như đăng nhập hoặc đăng ký, bạn thực hiện các công việc sau:
			(successResponse) => {
				// 1. Kiểm tra xem đường dẫn URL của phản hồi (response.config.url) có phải là đường dẫn của đăng nhập hoặc đăng ký không. Nếu đúng,
				// đây là các tác vụ đăng nhập hoặc đăng ký.
				const { url } = successResponse.config;
				// Chú ý: giá trị url cần lấy theo path url của API (quy định bởi Server) chứ không phải lấy theo path url quy định bởi react-router
				// -> nếu không đây sẽ là chỗ tiềm tàng bug, trong trường hợp react router thay đổi khác đi so với patth url từ API sẽ gây ra bug.
				if (url === loginPathURL || url === registerPathURL) {
					const data: AuthenticationSuccessResponse | User = successResponse.data;
					// 2. Trích xuất access token từ phản hồi (response.data.data.access_token) và lưu nó vào biến this.accessToken. Điều này làm cho
					// access token này có sẵn cho các yêu cầu tiếp theo mà người dùng có thể thực hiện, lưu ý cần để callback này là arrow function mới
					// có thể truy cập vào this.accessToken: string
					this.accessToken = (successResponse.data as AuthenticationSuccessResponse).data.access_token;
					// 3. trích xuất refresh_token từ API trả về và lưu vào thuộc tính this.refreshToken: (Khi thực hiện chức năng refresh_token, ta lại lấy refresh_token từ thuộc
					// tính này, tức là lấy từ RAM để cải thiện hiệu suất).
					// -> tiếp theo cần khai báo 3 utils thực hiện 3 tác vụ: lưu refresh_token, xoá refresh_token và lấy từ/trong local storage.
					this.refreshToken = (successResponse.data as AuthenticationSuccessResponse).data.refresh_token;
					// 4. Lưu access_token, refresh_token và user_profile vào local storage (lưu từ thuộc tính this......)
					// -> lưu accessToken vào localStorage (src/utils/authentication/saveAccess....)
					saveAccessTokenToLocalStorage(this.accessToken as string);
					// -> Lưu refresh_token vào local storage:
					saveRefreshTokenToLocalStorage(this.refreshToken as string);
					// Lưu userProfile vào local storage:
					saveUserProfileToLocalStorage(data as User);
				} else if (url === logoutPathURL) {
					// Khi logout:
					// -> accessToken, refreshToken được clear hết trong Local Storage và trả về chuỗi rỗng, userProfile cũng tương tự.
					this.accessToken = "";
					this.refreshToken = "";
					clearAccessTokenFromLocalStorage();
					clearUserProfileFromLocalStorage();
					clearRefreshTokenFromLocalStorage();
				}
				return successResponse;
			},
			// Callback Interceptor cho response khi thực hiện tác vụ call API thất bại.
			(errorResponse: AxiosError) => {
				if (isNotUnprocessableEntityError(errorResponse) && !isAxiosUnauthorizedError(errorResponse)) {
					const errorData: any | undefined | null = (errorResponse as AxiosError<unknown, any>).response?.data;
					const errorMessage = errorData?.message || (errorResponse as AxiosError<unknown, any>).message;
					toast.error(errorMessage);
				}
				// type Predicate bắt lỗi 401: bao gồm cả trường hợp access_token hết hạn.
				if (isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(errorResponse)) {
					const errorResponseConfig = errorResponse.response?.config;
					const { url } = errorResponseConfig as InternalAxiosRequestConfig<any>;
					if (isAxiosExpiredTokenError<AxiosError<AxiosError<unknown, any>, any>>(errorResponse) && url !== refreshTokenPathURL) {
						// Thực hiện việc refresh_token gián tiếp thông qua thuộc tính this.refreshTokenRequest
						this.refreshTokenRequest =
							this.refreshTokenRequest !== null
								? this.refreshTokenRequest
								: (this.handleRefreshTokenAutomatically().finally(() => {
										setTimeout(() => {
											this.refreshTokenRequest = null;
										}, 10000);
								  }) as Promise<string> | null);
						return this.refreshTokenRequest?.then((new_access_token) => {
							return this.instance({
								...errorResponseConfig,
								headers: {
									...(errorResponseConfig as InternalAxiosRequestConfig<any>).headers,
									Authorization: new_access_token,
								},
							});
						});
					}
					// 1. clear access_token trong local storage.
					clearAccessTokenFromLocalStorage();
					// 2. clear user profile trong local storage.
					clearUserProfileFromLocalStorage();
					this.accessToken = "";
					this.refreshToken = "";
					// Không thể refresh_token -> toast lên:
					toast.error(
						((errorResponse.response?.data as ErrorResponseApi<{ name: string; message: string }>).data?.message as string) ||
							(errorResponse.response?.data.message as string),
					);
					clearLocalStorageEventTarget.dispatchEvent(clearAccessTokenUserProfileEvent);
				}
				return Promise.reject(errorResponse);
			},
		);
	}
}
const httpInstance = new Http().instance;
export default httpInstance;
