import * as yup from "yup";
import { handleConfirmPasswordSchema } from "src/utils";

// rule cho form register
const formRulesSchema = yup.object({
	// rule cho email
	email: yup
		// phải có type = string
		.string()
		// bắt buộc phải nhập email:
		.required("Chú ý: Bắt buộc nhập Email")
		// Nhập email phải đúng định dạng example@example.com
		.email("Chú ý: Nhập email đúng định dạng như sau: example@example.com")
		// ký tự nhập email >= 5
		.min(5, "Chú ý: Email đăng ký tối thiểu là 5 ký tự")
		// ký tự nhập email <= 160
		.max(160, "Chú ý: Email đăng ký tối đa là 160 ký tự"),
	// rule cho password
	password: yup
		// phải có type = string
		.string()
		// bắt buộc phải nhập email:
		.required("Chú ý: Bắt buộc nhập Password")
		// ký tự nhập email >= 5
		.min(6, "Chú ý: Password đăng ký tối thiểu là 6 ký tự")
		// ký tự nhập email <= 160
		.max(160, "Chú ý: Password đăng ký tối đa là 160 ký tự"),
	// rule cho confirm_password
	confirm_password: handleConfirmPasswordSchema("password"),
});
// -> truyền formRulesSchema thành type FormRulesSchema có dạng:
// type FormRulesSchema = {
//   email: string;
//   password: string;
//   confirm_password: string;
// }
// -> sử dụng type FormRulesSchema tại page Login, định nghĩa type cho biến body
// của mutation login và register (register Omit đi thuộc tính confirm_password)

export default formRulesSchema;
