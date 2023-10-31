# Xử lý successRequest và errorRequest trước khi gửi đi

```ts
this.instance.interceptors.request.use(
	// 1. Trong hàm config, kiểm tra xem access token (this.accessToken) đã được định nghĩa và tồn tại.
	(successRequest) => {
		// Nếu có và config.headers tồn tại (để tránh gửi yêu cầu với undefined headers), bạn thêm access token vào tiêu đề
		// (config.headers.authorization) của yêu cầu. Điều này đảm bảo rằng mọi yêu cầu đi kèm với access token nếu người dùng đã đăng nhập.
		// Mấu chốt ở đây là ta sử dụng access_token từ giá trị của thuộc tính this.access_token thay vì lấy từ LS ở mỗi lần Request sau.
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
	// -> Tóm lại, interceptor này đảm bảo rằng việc xác thực thông qua access token được thực hiện cho mọi yêu cầu gửi từ ứng dụng của bạn,
	// và nó loại bỏ việc phải thêm access token thủ công vào mỗi yêu cầu một cách riêng lẻ. Điều này giúp giảm lỗi trong việc xác thực và
	// làm cho mã của bạn trở nên sạch sẽ và dễ bảo trì hơn.
);
```
