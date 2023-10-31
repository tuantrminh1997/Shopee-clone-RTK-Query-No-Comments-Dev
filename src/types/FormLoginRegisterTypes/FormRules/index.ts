import type { RegisterOptions } from "react-hook-form";

type FormRules = { [key in "email" | "password" | "confirm_password"]: RegisterOptions };
export default FormRules;
