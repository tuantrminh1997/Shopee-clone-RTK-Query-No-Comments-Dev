import { paths } from "src/constants";

const loginRegisterConstants = [
	{
		to: paths.register,
		isLeftElement: true,
		title: "đăng ký",
	},
	{
		to: paths.login,
		isLeftElement: false,
		title: "đăng nhập",
	},
] as const;
export default loginRegisterConstants;
