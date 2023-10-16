// axios
// import { HttpStatusCode } from "axios";
import { AxiosError } from "axios";
// type predicate functions:
import { isAxiosErrorTypePredicateMethod } from "src/utils";
// types:
// sử dụng enum HttpStatusCode do ta chép từ thư viện axios sang:
import { HttpStatusCode } from "src/types";

/**
 * ý đồ sử dụng type predicate function isAxiosUnprocessableEntityError
 * -> gọi hàm isAxiosUnprocessableEntityError và truyền đối số cho generic parameter dạng:
 * {data : {email: string, password: string}, message: tring}
 * -> error sẽ có type AxiosError dạng cấu trúc
 */

export default function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
	// Thay vì set cứng error.response?.status === 422
	// -> ta gọi thẳng tới nguồn gốc của giá trị 422 được quy định trong thư viện axios -> giá trị của thuộc tính UnprocessableEntity trong enum
	// HttpStatusCode trong axios
	// return axios.isAxiosError(error) && error.response?.status === 422;

	/**
	 * -> Tuy nhiên ý tưởng trỏ thẳng tới enum HttpStatusCode -> gọi tới thuộc tính UnprocessableEntity của nó bất thành .
	 * -> ta định nghĩa 1 type enum riêng rồi chép enum HttpStatusCode có sẵn trong thư viện axios sang, import vào và sử dụng
	 */
	return isAxiosErrorTypePredicateMethod(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}
