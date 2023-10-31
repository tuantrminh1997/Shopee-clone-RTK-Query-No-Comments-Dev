import { FormRules } from "src/types";

const formRules: FormRules = {
	email: {
		required: {
			value: true,
			message: "Chú ý: Bắt buộc nhập email",
		},
		pattern: {
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
	},
};
export default formRules;
