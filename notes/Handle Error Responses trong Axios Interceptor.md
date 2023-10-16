# Error status làm việc với phía backend trong dự án này gồm: 422, 401 và các error chung chung khác:

1. 422: error khi đăng nhập sai -> bắt và xử lý trong onError (React Query) tại component và show lên UI.
2. 401: lỗi do access_token (hết hạn/bị thiếu/bị sai)
   -> bắt trong Interceptor và xử lý để cho refresh_token, nếu không thì refresh_token thì cho logout thẳng.

\*\*\* type Predicate để bắt: thỏa mãn 2 điều kiện

```ts
1. là 1 Axios Error: isAxiosErrorTypePredicateMethod(error)

export default function isAxiosErrorTypePredicateMethod<T>(error: unknown): error is AxiosError<T> {
	// gọi isAxiosError(error) để kiểm tra xem biến error có phải là một AxiosError hay không. Nếu biến error thuộc kiểu AxiosError<T> (với T cụ thể), thì hàm này sẽ trả về
	// true, ngược lại sẽ trả về false.
	return isAxiosError(error);
}

2. Có status = 401
error.response?.status === HttpStatusCode.Unauthorized
```

\*\*\* hướng xử lý sau khi bắt: tiếp tục bắt lỗi gây ra do access_token đã hết hạn nhưng refresh_token còn hạn.

- điều kiện của type Predicate:

  - là 1 AxiosExpiredTokenError:

```ts
isAxiosExpiredTokenError<AxiosError<AxiosError<unknown, any>, any>>(errorResponse);
```

-> Điều kiện của type Predicate để là 1 AxiosExpiredTokenError (access_token hết hạn nhưng refresh_token còn hạn, error được trả về khi thực hiện 1 tác vụ call API bình thường (truy cập vào giỏ hàng chẳng hạn) nhưng access_token đang sử dụng đã hết hạn):

```ts
return (
	// 1. là 1 AxiosUnauthorizedError: là 1 Axios Error và có status = 401
	isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error) &&
	// 2. phía Server quy định lỗi do access_token hết hạn sẽ trả về có thuộc tính error.response.data.data.name = " EXPIRED_TOKEN "
	(error.response?.data as ErrorResponseApi<{ name: string; message: string }>)?.data?.name === "EXPIRED_TOKEN"
);
```

- url truy cập vào khác với url để refresh_token trên server:

```ts
// trích xuất url truy cập từ errorResponse.response?.config.url
const errorResponseConfig = errorResponse.response?.config;
const { url } = errorResponseConfig as InternalAxiosRequestConfig<any>;

&& url !== refreshTokenPathURL
```

-> sau khi bắt được AxiosExpiredTokenError -> tiến hành refresh_token

3. Những errorResponse khác, khác 2 loại errorResponse trên, bắt tại Axios và toast lên Màn hình.

```ts
if (isNotUnprocessableEntityError(errorResponse) && !isAxiosUnauthorizedError(errorResponse)) {
	// Bắt lỗi khác lỗi có status Khác 422, chính là những lỗi chung chung, có message đơn giản.
	// -> đơn giản là toast lên bằng React Toastify.
	// Error về typescript xuất hiện ở đây: message không tồn tại trong type {}
	// const errorMessage = error.response?.data?.message;
	// -> error object được server trả về thì error.response?.data có thể là bất kì kiểu gì (1 string HTML, thậm chí là
	// undefined hoặc null)
	const errorData: any | undefined | null = (errorResponse as AxiosError<unknown, any>).response?.data;
	// -> trong trường hợp error.response.data là 1 kiểu vô định (có thể là chuỗi HTML) và không chứa thuộc tính message
	// -> ta sử dụng message trong error object (message: "Request failed with status code 404")

	// Chú ý: phải thêm option chaining tại errorData?.message, nếu không gây lỗi crash do errorData có thể bị undefined (tại chức năng upload ảnh khi ta cố tình upload
	//  1 ảnh kích thước > 1mb, cụ thể ở trường hợp đó -> toast ra error.message)
	const errorMessage = errorData?.message || (errorResponse as AxiosError<unknown, any>).message;
	// console.log("errorData in interceptor", errorData);
	toast.error(errorMessage);
}
```

\*\*\* Điều kiện của type Predicate để bắt:

- Là 1 Axios Error
- có status !== 422
- có status !== 401

\*\*\* hướng xử lý khi bắt được

- trích xuất error message nằm trong: errorResponse.response.data.message hoặc errorResponse.message
  -> sử dụng React.toastify và toast lên màn hình.
