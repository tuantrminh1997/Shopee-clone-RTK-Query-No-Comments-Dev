/* eslint-disable @typescript-eslint/no-explicit-any */
// react toastify
import { toast } from "react-toastify";
// RTK Query
import { createApi } from "@reduxjs/toolkit/query/react";
// axios
import axios from "axios";
// api methods
import { getUserProfileApi, updateUserAvatarApi, updateUserProfileApi } from "src/apis";
// types
import { User, SuccessResponseApi, UpdateUserProfileBodyType, ChangeUserPasswordBodyType } from "src/types";

const userProfileSliceApi = createApi({
	reducerPath: "userProfileSliceApi",
	baseQuery: axios,
	endpoints: (build) => ({
		// 1. endpoint quản lý chức năng get user Profile
		getUserProfile: build.query<SuccessResponseApi<User>, void>({
			queryFn: async () => {
				try {
					const response = await getUserProfileApi();
					return { data: response.data };
				} catch (error: any) {
					return { error };
				}
			},
		}),
		// 2. endpoint quản lý tác vụ update User Profile:
		updateUserProfile: build.mutation<SuccessResponseApi<User>, UpdateUserProfileBodyType | ChangeUserPasswordBodyType>({
			queryFn: async (updateUserProfileApiBody) => {
				try {
					const response = await updateUserProfileApi(updateUserProfileApiBody);
					const successMessage = response.data.message;
					if (successMessage) {
						toast.success(successMessage, {
							position: "top-center",
							autoClose: 2000,
						});
					}
					return { data: response.data };
				} catch (error) {
					return { error };
				}
			},
		}),
		// 3. endpoint quản lý tác vụ update User Avatar
		updateUserAvatar: build.mutation<SuccessResponseApi<string>, FormData>({
			queryFn: async (updateUserAvatarBody: FormData) => {
				try {
					const response = await updateUserAvatarApi(updateUserAvatarBody);
					console.log("update user avatar response at mutation: ", response.data.data);
					const successMessage = response.data.message;
					if (successMessage) {
						toast.success(successMessage, {
							position: "top-center",
							autoClose: 2000,
						});
					}
					return { data: response.data };
				} catch (error) {
					return { error };
				}
			},
		}),
	}),
});
export const { useGetUserProfileQuery, useUpdateUserProfileMutation, useUpdateUserAvatarMutation } = userProfileSliceApi;
export default userProfileSliceApi;
