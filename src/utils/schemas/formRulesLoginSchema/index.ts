import { formRulesSchema } from "src/utils";

const formRulesLoginSchema = formRulesSchema.omit(["confirm_password"]);
export default formRulesLoginSchema;
