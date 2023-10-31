import * as yup from "yup";
import { formRulesLoginSchema } from "src/utils";

type FormRulesLogin = yup.InferType<typeof formRulesLoginSchema>;
export default FormRulesLogin;
