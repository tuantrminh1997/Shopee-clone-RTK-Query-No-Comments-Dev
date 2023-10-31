import * as yup from "yup";
import { formRulesSchema, handleConfirmPasswordSchema } from "src/utils";

const userProfileSchema = yup.object({
	name: yup.string().max(160, "Độ dài tối đa 160 ký tự"),
	phone: yup.string().max(20, "Độ dài tối đa 20 ký tự"),
	address: yup.string().max(160, "Độ dài tối đa 160 ký tự"),
	avatar: yup.string().max(1000, "Độ dài tối đa 1000 ký tự"),
	date_of_birth: yup.date().max(new Date(), "Hãy chọn ngày/tháng/năm sinh phù hợp"),
	password: formRulesSchema.fields["password"] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, "">,
	new_password: formRulesSchema.fields["password"] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, "">,
	confirm_password: handleConfirmPasswordSchema("new_password"),
});
export default userProfileSchema;
