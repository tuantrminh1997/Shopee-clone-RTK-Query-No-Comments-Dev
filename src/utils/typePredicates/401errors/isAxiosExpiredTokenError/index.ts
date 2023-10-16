import { isAxiosUnauthorizedError } from "src/utils";
import { AxiosError } from "axios";
import { ErrorResponseApi } from "src/types";

// bắt lỗi khi token hết hạn
// -> error phải là kiểu UnauthorizedError (401) đồng thời server trả về
// {
//   message: "lỗi",
//   "data": : { "message": "Token hết hạn", "name": "EXPIRED_TOKEN" }
//  }
export default function isAxiosExpiredTokenError<ExpiredTokenError>(
	error: unknown,
): error is AxiosError<ExpiredTokenError> {
	return (
		// thay vì console.log toàn bộ khối error\
		// -> test trên postman và ta sẽ thấy postman lược bỏ các thành phần bên ngoài và show ra khối dữ liệu chính
		// -> type truyền vào generic parameter cho isAxiosUnauthorizedError chính là type của toàn bộ khối error đó
		isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error) &&
		(error.response?.data as ErrorResponseApi<{ name: string; message: string }>)?.data?.name === "EXPIRED_TOKEN"
	);
}
