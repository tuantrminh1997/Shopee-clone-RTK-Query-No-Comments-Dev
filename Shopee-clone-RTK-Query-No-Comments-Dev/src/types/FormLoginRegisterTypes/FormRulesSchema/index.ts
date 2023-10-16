import { formRulesSchema } from "src/utils";
import * as yup from "yup";

/**
 * type FormRulesSchema kế thừa lại cấu trúc của object formRulesSchema
 */
type FormRulesSchema = yup.InferType<typeof formRulesSchema>;

export default FormRulesSchema;
