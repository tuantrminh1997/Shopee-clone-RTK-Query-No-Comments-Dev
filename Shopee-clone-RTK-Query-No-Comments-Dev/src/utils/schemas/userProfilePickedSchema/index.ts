import { userProfileSchema } from "src/utils";

const userProfilePickedSchema = userProfileSchema.pick(["name", "address", "phone", "date_of_birth", "avatar"]);
export default userProfilePickedSchema;
