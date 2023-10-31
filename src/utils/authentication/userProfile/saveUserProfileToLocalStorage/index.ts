import { User } from "src/types";

const saveUserProfileToLocalStorage = (userProfile: User) => {
	localStorage.setItem("userProfile", JSON.stringify(userProfile));
};
export default saveUserProfileToLocalStorage;
