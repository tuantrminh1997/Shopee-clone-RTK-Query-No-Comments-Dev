/**
 * FormRules cho object login, giống hệt FormRules cho Register nhưng omit thuộc tính confirm_password
 */
import * as yup from "yup";
import { formRulesLoginSchema } from "src/utils";

/**
 * type FormRulesLogin kế thừa lại cấu trúc của object formRulesLoginSchema:
 * const formRulesSchema = yup.object({
	email: yup
		.string()
		.required("Chú ý: Bắt buộc nhập Email")
		.email("Chú ý: Nhập email đúng định dạng như sau: example@example.com")
		.min(5, "Chú ý: Email đăng ký tối thiểu là 5 ký tự")
		.max(160, "Chú ý: Email đăng ký tối đa là 160 ký tự"),
	password: yup
		.string()
		.required("Chú ý: Bắt buộc nhập Password")
		.min(5, "Chú ý: Password đăng ký tối thiểu là 5 ký tự")
		.max(160, "Chú ý: Password đăng ký tối đa là 160 ký tự"),
});
  -> type FormRulesLogin có cấu trúc:
      type FormRulesLogin = {
        email: string;
        password: string;
    }
 */
type FormRulesLogin = yup.InferType<typeof formRulesLoginSchema>;
export default FormRulesLogin;
