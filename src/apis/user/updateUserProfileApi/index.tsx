// path urls:
import { updateUserProfileBasePathURL } from "src/constants";
// utils
import { httpInstance as http } from "src/utils";
// types:
import { ChangeUserPasswordBodyType, SuccessResponseApi, User, UpdateUserProfileBodyType } from "src/types";

// const a: UpdateUserProfileBodyType = {
// 	address: "Việt Nam",
// 	date_of_birth: "1907-02-18T17:17:56.000Z",
// 	name: "Dư Thanh Được",
// 	phone: "04511414",
// 	avatar: "URL Avatar",
// 	password: "Mật khẩu cũ",
// 	new_password: "Mật khẩu mới",
// };

const updateUserProfileApi = (body: UpdateUserProfileBodyType | ChangeUserPasswordBodyType) =>
	http.put<SuccessResponseApi<User>>(`${updateUserProfileBasePathURL}`, body);
export default updateUserProfileApi;
