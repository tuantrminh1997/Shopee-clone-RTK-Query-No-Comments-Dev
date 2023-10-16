Thư mục chứa định nghĩa type cho các thuộc tính của namespace, handle chức năng đa ngôn ngữ.
file .d.ts = File TypeScript Declaration (.d.ts):

1. File .d.ts là các tệp định nghĩa kiểu dữ liệu và chữ ký của các thư viện hoặc các module JavaScript không phải TypeScript.
2. Chúng được sử dụng để cung cấp thông tin kiểu cho các thư viện JavaScript bên ngoài khi bạn sử dụng chúng trong mã nguồn TypeScript.
3. File .d.ts không chứa mã nguồn JavaScript thực tế, chỉ định dạng kiểu dữ liệu.
4. TypeScript Compiler không biên dịch file .d.ts, nhưng nó sử dụng chúng để kiểm tra kiểu dữ liệu và tránh lỗi kiểu tại thời gian biên dịch trong quá trình sử dụng các thư viện không phải TypeScript.

Ví dụ về file .d.ts:

```ts
// react.d.ts
declare module "react" {
	// Định nghĩa các kiểu dữ liệu và chữ ký cho React
	export function useState<T>(initialState: T): [T, (newState: T) => void];
	// ...
}
```

-> Trong ví dụ này, react.d.ts là một file định nghĩa kiểu dữ liệu cho thư viện React để TypeScript biết về kiểu của các hàm và biến trong React.

-> Tóm lại, file .ts là mã nguồn TypeScript thực tế, trong khi file .d.ts là các định nghĩa kiểu dữ liệu để TypeScript hiểu về các thư viện không phải TypeScript.
