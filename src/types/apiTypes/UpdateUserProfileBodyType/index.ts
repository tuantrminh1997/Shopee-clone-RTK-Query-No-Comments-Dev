import { User } from "src/types";

// interface User {
// 	_id: string;
// 	roles: RoleType[];
// 	email: string;
// 	name?: string;
// 	date_of_birth?: string; // iso 9001
// 	avatar?: string;
// 	address?: string;
// 	phone?: string;
// 	createdAt: string;
// 	updatedAt: string;
// }
// -> Omit đi các thuộc tính và kế thừua lại, thêm password và new_password
interface UpdateUserProfileBodyType extends Omit<User, "_id" | "roles" | "createdAt" | "updatedAt" | "email"> {
	password?: string;
	new_password?: string;
}
// -> UpdateUserProfileBodyType sẽ có cấu trúc:
// {
// 	name?: string;
// 	date_of_birth?: string; // iso 9001
// 	avatar?: string;
// 	address?: string;
// 	phone?: string;
// password?: string;
// new_password?: string;
// }
export default UpdateUserProfileBodyType;
