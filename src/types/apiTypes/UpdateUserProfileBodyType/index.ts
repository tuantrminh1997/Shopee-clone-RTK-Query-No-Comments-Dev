import { User } from "src/types";

interface UpdateUserProfileBodyType extends Omit<User, "_id" | "roles" | "createdAt" | "updatedAt" | "email"> {
	password?: string;
	new_password?: string;
}
export default UpdateUserProfileBodyType;
