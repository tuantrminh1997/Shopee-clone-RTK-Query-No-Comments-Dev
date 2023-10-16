type RoleType = "User" | "Admin";

interface User {
	/**
   * Định nghĩa type interface cho object user, nằm trong response của chức năng Login có cấu trúc như sau:
    "user": {
      "_id": "6098f5b516905536e818f8cc",
      "roles": ["User"],
      "email": "user2@gmail.com",
      "name": "Real user",
      "date_of_birth": null,
      "address": "",
      "phone": "",
      "createdAt": "2021-05-10T08:58:29.081Z",
      "updatedAt": "2021-05-10T08:58:29.081Z",
      "__v": 0
    }
   */
	_id: string;
	roles: RoleType[];
	email: string;
	name?: string;
	date_of_birth?: string; // iso 9001
	avatar?: string;
	address?: string;
	phone?: string;
	createdAt: string;
	updatedAt: string;
}
export default User;
