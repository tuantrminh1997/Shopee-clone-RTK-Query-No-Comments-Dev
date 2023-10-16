import { UserProfileSchema } from "src/types";

type ChangePasswordPickedFormData = Pick<UserProfileSchema, "password" | "new_password" | "confirm_password">;
export default ChangePasswordPickedFormData;
