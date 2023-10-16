// path urls:
import { uploadUserAvatarPathURL } from "src/constants";
// utils
import { httpInstance as http } from "src/utils";
// types:
import { SuccessResponseApi } from "src/types";

const updateUserAvatarApi = (body: FormData) =>
	http.post<SuccessResponseApi<string>>(`${uploadUserAvatarPathURL}`, body, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
export default updateUserAvatarApi;
