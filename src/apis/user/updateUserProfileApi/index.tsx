// path urls:
import { updateUserProfileBasePathURL } from "src/constants";
// utils
import { httpInstance as http } from "src/utils";
// types:
import { ChangeUserPasswordBodyType, SuccessResponseApi, User, UpdateUserProfileBodyType } from "src/types";

const updateUserProfileApi = (body: UpdateUserProfileBodyType | ChangeUserPasswordBodyType) =>
	http.put<SuccessResponseApi<User>>(updateUserProfileBasePathURL, body);
export default updateUserProfileApi;
