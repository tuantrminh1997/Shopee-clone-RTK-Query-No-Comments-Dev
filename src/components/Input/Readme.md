# Lưu ý khi tái sử dụng component Input:

```ts
const registerResult = register && formPropertyRules ? register(formPropertyName, formPropertyRules) : {};
```

-> Khi truyền register và formPropertyRules:

- Biến registerResult sẽ trả về kết quả của việc đăng ký trường đầu vào (input field) cho thư viện quản lý biểu mẫu (form management library) như react-hook-form. Kết quả này bao gồm các thuộc tính và phương thức được cung cấp bởi thư viện để liên kết và quản lý trạng thái của trường đầu vào trong biểu mẫu.

- Trong trường hợp đoạn code của bạn, biến registerResult sẽ trả về một đối tượng có các thuộc tính và phương thức sau (nếu register và formPropertyRules được cung cấp):

* name: Tên của trường đầu vào (formPropertyName).
* ref: Tham chiếu đến phần tử DOM của trường đầu vào, được cung cấp bởi ref từ register.
* onChange: Hàm xử lý sự kiện thay đổi giá trị của trường đầu vào, được cung cấp bởi register.
* onBlur: Hàm xử lý sự kiện mất trỏ chuột khỏi trường đầu vào, được cung cấp bởi register.
* value: Giá trị của trường đầu vào, thường sẽ là undefined trong trường hợp này vì bạn không cung cấp giá trị mặc định.
* ref: Tham chiếu đến phần tử DOM của trường đầu vào, được cung cấp bởi ref từ register.
  -> Khi bạn truyền register và formPropertyRules vào, registerResult sẽ được tạo ra để kết nối trường đầu vào với thư viện quản lý biểu mẫu. Trường hợp nếu bạn không truyền register hoặc formPropertyRules, thì registerResult sẽ là một đối tượng rỗng.

-> Khi không truyền register và formPropertyRules:

- Trong trường hợp bạn không truyền register và formPropertyRules vào hàm Input, thì biến registerResult sẽ trở thành một đối tượng trống (empty object), không có bất kỳ thuộc tính nào. Điều này có nghĩa là trường đầu vào (input) sẽ không được liên kết với thư viện quản lý biểu mẫu (react-hook-form trong trường hợp này) và sẽ không có các thuộc tính và phương thức như name, ref, onChange, onBlur và value được truyền vào.

- Kết quả là trường đầu vào sẽ không thể tham gia vào việc quản lý trạng thái của biểu mẫu hoặc gửi dữ liệu khi bạn submit biểu mẫu. Trong trường hợp này, bạn có thể sử dụng trường đầu vào một cách độc lập mà không liên quan đến việc quản lý biểu mẫu.
