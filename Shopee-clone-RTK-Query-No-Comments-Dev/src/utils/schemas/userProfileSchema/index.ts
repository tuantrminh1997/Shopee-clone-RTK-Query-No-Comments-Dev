import * as yup from "yup";
import { formRulesSchema, handleConfirmPasswordSchema } from "src/utils";

// Rules
// - name: string, maxLength = 160
// - phone: string, maxLength = 20
// - address: string, maxLength = 160
// - date_of_birth: string, ISO8601
// - avatar: string, maxLength 1000
// - password: string, length 6-160
// - new_password: string, length 6-160

const userProfileSchema = yup.object({
	name: yup.string().max(160, "Độ dài tối đa 160 ký tự"),
	phone: yup.string().max(20, "Độ dài tối đa 20 ký tự"),
	address: yup.string().max(160, "Độ dài tối đa 160 ký tự"),
	avatar: yup.string().max(1000, "Độ dài tối đa 1000 ký tự"),
	// Giá trị max của date_of_birth = new Date() = chính thời điểm hiện tại
	date_of_birth: yup.date().max(new Date(), "Hãy chọn ngày/tháng/năm sinh phù hợp"),
	// ép kiểu chặt chẽ để không bị lỗi unknown - lỗi typescript
	password: formRulesSchema.fields["password"] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, "">,
	new_password: formRulesSchema.fields["password"] as yup.StringSchema<
		string | undefined,
		yup.AnyObject,
		undefined,
		""
	>,
	confirm_password: handleConfirmPasswordSchema("new_password"),
});
export default userProfileSchema;
