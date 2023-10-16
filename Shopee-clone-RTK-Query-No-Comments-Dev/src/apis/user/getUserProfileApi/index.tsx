// path urls:
import { userProfileBasePathURL } from "src/constants";
// utils
import { httpInstance as http } from "src/utils";
// types:
import { SuccessResponseApi, User } from "src/types";

// get user profile: /me
// update user profile: /user
// upload user avatar: /user/upload-avatar

const getUserProfileApi = () => http.get<SuccessResponseApi<User>>(`${userProfileBasePathURL}`);
export default getUserProfileApi;
