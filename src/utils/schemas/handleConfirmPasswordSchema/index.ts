/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

const handleConfirmPasswordSchema: (referenceString: string) => yup.StringSchema<string, yup.AnyObject, undefined, ""> = (referenceString: string) =>
	yup
		.string()
		.required("Chú ý: Bắt buộc nhập Password xác thực")
		.min(6, "Chú ý: Password đăng ký tối thiểu là 6 ký tự")
		.max(160, "Chú ý: Password đăng ký tối đa là 160 ký tự")
		.oneOf([yup.ref(referenceString)], "Chú ý: Password xác thực không khớp !");

export default handleConfirmPasswordSchema;
