# Xử lý Success Response trong dự án

1. Success Response khi đăng nhập hoặc đăng ký thành công
   -> bắt Success Response này và xử lý tại Interceptor Axios

\*\*\* Điều kiện để bắt: url trích xuất từ successResponse.config trùng với loginPath hoặc registerPath

```ts
const { url } = successResponse.config;
```

```ts
if (url === loginPathURL || url === registerPathURL) {

```

\*\*\* Hướng xử lý sau khi bắt được:
-> sau khi bắt được Success Response, thực hiện liên tục các việc:

1. trích xuất access_token và lưu vào thuộc tính accessToken của instance Axios
   -> các lần request sau ta sẽ lấy access_token từ đây thay vì lấy từ Local Storage.
   ```ts
   const data: AuthenticationSuccessResponse | User = successResponse.data;
   // 2. Trích xuất access token từ phản hồi (response.data.data.access_token) và lưu nó vào biến this.accessToken. Điều này làm cho
   // access token này có sẵn cho các yêu cầu tiếp theo mà người dùng có thể thực hiện, lưu ý cần để callback này là arrow function mới
   // có thể truy cập vào this.accessToken: string
   this.accessToken = (data as AuthenticationSuccessResponse).data.access_token;
   ```
2. trích xuất refresh_token và lưu vào thuộc tính refreshToken của instance Axios
   -> các lần request sau ta sẽ lấy refresh_token từ đây thay vì lấy từ Local Storage.

   ```ts
   // 3. trích xuất refresh_token từ API trả về và lưu vào thuộc tính this.refreshToken: (Khi thực hiện chức năng refresh_token, ta lại lấy refresh_token từ thuộc
   // tính này, tức là lấy từ RAM để cải thiện hiệu suất).
   // -> tiếp theo cần khai báo 3 utils thực hiện 3 tác vụ: lưu refresh_token, xoá refresh_token và lấy từ/trong local storage.
   this.refreshToken = (data as AuthenticationSuccessResponse).data.refresh_token;
   ```

3. Lưu giá trị thuộc tính accessToken vào local Storage

```ts
// 4. Lưu access_token, refresh_token và user_profile vào local storage (lưu từ thuộc tính this......)
// -> lưu accessToken vào localStorage (src/utils/authentication/saveAccess....)
saveAccessTokenToLocalStorage(this.accessToken as string);
```

4. Lưu giá trị thuộc tính refreshToken vào local Storage

```ts
// -> Lưu refresh_token vào local storage:
saveRefreshTokenToLocalStorage(this.refreshToken as string);
```

5. Lưu Data User Profile vào Local Storage

```ts
// Lưu userProfile vào local storage:
saveUserProfileToLocalStorage(data as User);
```

6. Success Response khi đăng xuất thành công:
   -> bắt Success Response này và xử lý tại Interceptor Axios
   \*\*\* Điều kiện bắt: url trích xuất === logoutPathURL

```ts
else if (url === logoutPathURL) {
					// Khi logout:
					// -> accessToken, refreshToken được clear hết trong Local Storage và trả về chuỗi rỗng, userProfile cũng tương tự.
					this.accessToken = "";
					this.refreshToken = "";
					clearAccessTokenFromLocalStorage();
					clearUserProfileFromLocalStorage();
					clearRefreshTokenFromLocalStorage();
				}
```

\*\*\* Hướng xử lý sau khi bắt được response logout thành công
-> thực hiện liên tiếp các tác vụ sau:

- reset 2 thuộc tính accesToken refreshToken trong Axios Instance về chuỗi rỗng.
- xóa toàn bộ accessToken, refreshToken, userProfile trong local Storage.
