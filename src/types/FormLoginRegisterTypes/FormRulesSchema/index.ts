import { formRulesSchema } from "src/utils";
import * as yup from "yup";

type FormRulesSchema = yup.InferType<typeof formRulesSchema>;
export default FormRulesSchema;
