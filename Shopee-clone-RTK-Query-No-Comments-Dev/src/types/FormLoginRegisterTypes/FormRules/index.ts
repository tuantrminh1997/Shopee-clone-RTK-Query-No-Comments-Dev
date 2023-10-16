/**
 * import type {} from ... hoặc import {type ...} from ... để chỉ định suggest ra các type hoặc interface, các kiểu dữ liệu khác sẽ ko suggest
 */
import type { RegisterOptions } from "react-hook-form";

/**
 * type FormRules có chứa 1 hoặc 1 vài thuộc tính giống với thuộc tính của type RegisterOptions từ react-hook-form đúng không ?
 */
// type FormRules = { [key: string]: RegisterOptions };
/**
 * Ta nên định nghĩa FormRules như sau để biến có type FormRules tự động suggest thuôc tính được quy định trong type
 * type FormRules có dạng 1 object, các thuộc tính email, password, confirm_password, mỗi thuộc tính lại là 1 object có
 * type = RegisterOptions
 */
type FormRules = { [key in "email" | "password" | "confirm_password"]: RegisterOptions };
export default FormRules;
