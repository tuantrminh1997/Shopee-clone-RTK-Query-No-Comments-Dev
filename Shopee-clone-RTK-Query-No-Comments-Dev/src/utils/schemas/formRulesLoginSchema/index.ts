/**
 * formRulesLoginSchema cho object login, giống hệt FormRules cho Register nhưng omit thuộc tính confirm_password
 */
import { formRulesSchema } from "src/utils";

const formRulesLoginSchema = formRulesSchema.omit(["confirm_password"]);
export default formRulesLoginSchema;
