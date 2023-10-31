import { FormRules } from "src/types";
import type { UseFormGetValues } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFormRules = (getValues?: UseFormGetValues<any>): FormRules => ({
	email: {
		required: {
			value: true,
			message: "Chú ý: Bắt buộc nhập Email",
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
		validate: typeof getValues === "function" ? (value) => value === getValues("password") || "Chú ý: Password xác thực không khớp !" : undefined,
	},
});
export default getFormRules;
