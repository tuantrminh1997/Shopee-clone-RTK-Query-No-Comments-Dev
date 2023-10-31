/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { getUserProfileApi, updateUserAvatarApi, updateUserProfileApi } from "src/apis";
import { User, SuccessResponseApi, UpdateUserProfileBodyType, ChangeUserPasswordBodyType } from "src/types";

const userProfileSliceApi = createApi({
	reducerPath: "userProfileSliceApi",
	baseQuery: axios,
	endpoints: (build) => ({
		getUserProfile: build.query<SuccessResponseApi<User>, void>({
			queryFn: async () => {
				try {
					const response = await getUserProfileApi();
					return { data: response.data };
				} catch (error: any) {
					return { error };
				}
			},
			keepUnusedDataFor: 0,
		}),
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
		updateUserAvatar: build.mutation<SuccessResponseApi<string>, FormData>({
			queryFn: async (updateUserAvatarBody: FormData) => updateUserAvatarApi(updateUserAvatarBody),
		}),
	}),
});
export const { useGetUserProfileQuery, useUpdateUserProfileMutation, useUpdateUserAvatarMutation } = userProfileSliceApi;
export default userProfileSliceApi;
