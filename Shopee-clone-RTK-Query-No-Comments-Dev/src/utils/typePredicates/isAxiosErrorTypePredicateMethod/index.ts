import { isAxiosError, AxiosError } from "axios";

export default function isAxiosErrorTypePredicateMethod<T>(error: unknown): error is AxiosError<T> {
	// gọi isAxiosError(error) để kiểm tra xem biến error có phải là một AxiosError hay không. Nếu biến error thuộc kiểu AxiosError<T> (với T cụ thể), thì hàm này sẽ trả về
	// true, ngược lại sẽ trả về false.
	return isAxiosError(error);
}

// định nghĩa là một type predicate function. Type predicate function là một loại hàm trong TypeScript được sử dụng để kiểm tra xem một biến có thỏa mãn một kiểu cụ
// thể hay không. Trong trường hợp này, hàm isAxiosError được sử dụng để kiểm tra xem một biến có phải là một AxiosError (là một loại lỗi được tạo ra bởi Axios) hay
// không.

// Hãy xem xét hàm isAxiosErrorTypePredicateMethod của bạn:
// import axios, { AxiosError } from "axios";

// export default function isAxiosErrorTypePredicateMethod<T>(error: unknown): error is AxiosError<T> {
// 	return axios.isAxiosError(error);
// }

// Hàm này nhận vào một biến error có kiểu unknown, tức là kiểu của biến error không được xác định trước.
// - Nó sử dụng axios.isAxiosError(error) để kiểm tra xem biến error có phải là một AxiosError hay không. axios.isAxiosError là một phương thức có sẵn trong thư viện
// Axios để kiểm tra kiểu của lỗi.
// -> Kết quả trả về của hàm này là một kiểu boolean (true hoặc false), và bạn đặt kiểu trả về của hàm là error is AxiosError<T>. Điều này có nghĩa rằng nếu hàm trả về
// true, TypeScript sẽ hiểu rằng biến error là một AxiosError.
