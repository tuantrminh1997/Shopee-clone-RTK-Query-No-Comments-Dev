import { FormRules } from "src/types";
import type { UseFormGetValues } from "react-hook-form";

/**
 * Thay vì khai báo 1 object formRules
 * -> ta khai báo 1 function và trả về object rules
 * -> mục đích để ta có thể truyền hoặc không truyền thuộc tính getValues của object return từ useForm()
 * -> sử dụng thẳng thuộc tính validate trong object confirm_password
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFormRules = (getValues?: UseFormGetValues<any>): FormRules => ({
	email: {
		required: {
			value: true,
			message: "Chú ý: Bắt buộc nhập Email",
		},
		pattern: {
			/**
       * Pattern cho email: 
       *** ^[a-zA-Z0-9._-]+: Kiểm tra tên người dùng của email, có thể bao gồm chữ cái (viết hoa hoặc viết thường), chữ số, 
       * và các ký tự đặc biệt như dấu gạch dưới _, dấu chấm . và dấu gạch ngang -.
        *** @: Kiểm tra ký tự @ bắt buộc phải có trong địa chỉ email.
        *** [a-zA-Z0-9.-]+: Kiểm tra tên miền, cũng tương tự như tên người dùng, có thể chứa chữ cái, chữ số, dấu chấm . và 
        dấu gạch ngang -.
        *** \.: Kiểm tra ký tự dấu chấm . phải có trong địa chỉ email.
        *** [a-zA-Z]{2,4}$: Kiểm tra phần cuối của địa chỉ email (top-level domain), độ dài từ 2 đến 4 ký tự và chỉ bao gồm 
        chữ cái.
       */
			value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			message: "Chú ý: Nhập email đúng định dạng như sau: example@example.com",
		},
		minLength: {
			value: 5,
			message: "Chú ý: Email đăng ký tối thiểu là 5 ký tự",
		},
		maxLength: {
			value: 160,
			message: "Chú ý: Email đăng ký tối đa là 160 ký tự",
		},
	},
	password: {
		required: {
			value: true,
			message: "Chú ý: Bắt buộc nhập Password",
		},

		minLength: {
			value: 5,
			message: "Chú ý: Password đăng ký tối thiểu là 5 ký tự",
		},
		maxLength: {
			value: 160,
			message: "Chú ý: Password đăng ký tối đa là 160 ký tự",
		},
	},
	confirm_password: {
		required: {
			value: true,
			message: "Chú ý: Bắt buộc nhập Password xác thực",
		},
		minLength: {
			value: 5,
			message: "Chú ý: Password đăng ký tối thiểu là 5 ký tự",
		},
		maxLength: {
			value: 160,
			message: "Chú ý: Password đăng ký tối đa là 160 ký tự",
		},
		// Nếu có truyền hàm getValues -> typeof getValues === "function"
		// Nếu không truyền thì validate === undefined
		validate:
			typeof getValues === "function"
				? (value) => value === getValues("password") || "Chú ý: Password xác thực không khớp !"
				: undefined,
	},
});
export default getFormRules;
