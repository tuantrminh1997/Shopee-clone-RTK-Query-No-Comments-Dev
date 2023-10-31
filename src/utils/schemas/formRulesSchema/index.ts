import * as yup from "yup";
import { handleConfirmPasswordSchema } from "src/utils";

const formRulesSchema = yup.object({
	email: yup
		.string()
		.required("Chú ý: Bắt buộc nhập Email")
		.email("Chú ý: Nhập email đúng định dạng như sau: example@example.com")
		.min(5, "Chú ý: Email đăng ký tối thiểu là 5 ký tự")
		.max(160, "Chú ý: Email đăng ký tối đa là 160 ký tự"),
	password: yup
		.string()
		.required("Chú ý: Bắt buộc nhập Password")
		.min(6, "Chú ý: Password đăng ký tối thiểu là 6 ký tự")
		.max(160, "Chú ý: Password đăng ký tối đa là 160 ký tự"),
	confirm_password: handleConfirmPasswordSchema("password"),
});
export default formRulesSchema;
