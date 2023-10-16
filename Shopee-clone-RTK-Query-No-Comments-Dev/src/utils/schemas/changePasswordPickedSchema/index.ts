import { userProfileSchema } from "src/utils";

// Chú ý; tại file export tổng, cần export changePasswordPickedSchema ở sau dòng code export userProfileSchema
const changePasswordPickedSchema = userProfileSchema.pick(["password", "new_password", "confirm_password"]);
export default changePasswordPickedSchema;
