import { FormRules } from "src/types";

const formRules: FormRules = {
	// type FormRules = { [key in "email" | "password" | "confirm_password"]: RegisterOptions };
	// object formRules bắt buộc có đủ 3 key "email", "password", "confirm_password"
	email: {
		required: {
			value: true,
			message: "Chú ý: Bắt buộc nhập email",
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
		// validate: v => ... : truyền getValues thông qua toán tử spread ở component
	},
};
export default formRules;
