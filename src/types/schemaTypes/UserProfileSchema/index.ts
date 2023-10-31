import * as yup from "yup";
import { userProfileSchema } from "src/utils";

type UserProfileSchema = yup.InferType<typeof userProfileSchema>;
export default UserProfileSchema;
