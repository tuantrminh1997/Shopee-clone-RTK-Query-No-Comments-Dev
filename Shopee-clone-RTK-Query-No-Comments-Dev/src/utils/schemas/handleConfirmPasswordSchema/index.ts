/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

const handleConfirmPasswordSchema: (
	referenceString: string,
) => yup.StringSchema<string, yup.AnyObject, undefined, ""> = (referenceString: string) =>
	yup
		// phải có type = string
		.string()
		.required("Chú ý: Bắt buộc nhập Password xác thực")
		.min(6, "Chú ý: Password đăng ký tối thiểu là 6 ký tự")
		.max(160, "Chú ý: Password đăng ký tối đa là 160 ký tự")
		// -> handle chức năng confirm_password có rule phải trùng với password: xem tại github yup -> TypeScript integration
		// -> Schema.oneOf(arrayOfValues: Array<any>, message?: string | function): Schema Alias: equals
		.oneOf([yup.ref(referenceString)], "Chú ý: Password xác thực không khớp !");

export default handleConfirmPasswordSchema;
