type RoleType = "User" | "Admin";

interface User {
	_id: string;
	roles: RoleType[];
	email: string;
	name?: string;
	date_of_birth?: string;
	avatar?: string;
	address?: string;
	phone?: string;
	createdAt: string;
	updatedAt: string;
}
export default User;
