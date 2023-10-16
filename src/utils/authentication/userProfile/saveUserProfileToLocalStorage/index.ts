import { User } from "src/types";

const saveUserProfileToLocalStorage = (userProfile: User) => {
	// Nếu để JSON.parse(localStorage.getItem("userProfile")) -> gây ra vấn đề là trong trường hợp là null sẽ không parse được
	// handle bằng cách lưu vào 1 biến và return về null trong trường hợp biến đó trống.
	localStorage.setItem("userProfile", JSON.stringify(userProfile));
};
export default saveUserProfileToLocalStorage;
