import { UserProfileSchema } from "src/types";

type UserProfilePickedFormData = Pick<UserProfileSchema, "name" | "address" | "phone" | "date_of_birth" | "avatar">;
export default UserProfilePickedFormData;
