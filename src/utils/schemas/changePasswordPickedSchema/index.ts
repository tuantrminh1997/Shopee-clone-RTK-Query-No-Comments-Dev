import { userProfileSchema } from "src/utils";

const changePasswordPickedSchema = userProfileSchema.pick(["password", "new_password", "confirm_password"]);
export default changePasswordPickedSchema;
