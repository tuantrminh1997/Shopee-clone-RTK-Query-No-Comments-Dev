import { ChangePasswordPickedFormData } from "src/types";

type ChangeUserPasswordBodyType = Omit<ChangePasswordPickedFormData, "confirm_password">;
export default ChangeUserPasswordBodyType;
