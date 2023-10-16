/* eslint-disable @typescript-eslint/no-explicit-any */
// react toastify
import { toast } from "react-toastify";
// RTK Query
import { createApi } from "@reduxjs/toolkit/query/react";
// axios
import axios, { AxiosResponse } from "axios";
// api methods
import { registerApi, logoutApi, loginApi } from "src/apis";
// types
import { RegisterAccountBodyType, AuthenticationResponse } from "src/types";

const authenticationSliceApi = createApi({
	reducerPath: "authenticationSliceApi",
	baseQuery: axios,
	endpoints: (build) => ({
		// 1. endpoint quản lý chức năng đăng nhập
		login: build.mutation<AxiosResponse<AuthenticationResponse, any>, RegisterAccountBodyType>({
			queryFn: async (loginBody) => {
				try {
					const response = await loginApi(loginBody);
					// bắt message success response trả về từ server -> toast lên màn hình
					const successMessage = response.data.message;
					if (successMessage) {
						toast.success(successMessage, {
							position: "top-center",
							autoClose: 2000,
						});
					}
					return { data: response };
				} catch (error: any) {
					const errorResponseMessage = error.response.data.message;
					if (errorResponseMessage) {
						toast.error(errorResponseMessage, {
							position: "top-right",
							autoClose: 2000,
						});
					}
					return { error };
				}
			},
		}),
		// 2. endpoint quản lý chức năng đăng ký
		register: build.mutation<AuthenticationResponse, RegisterAccountBodyType>({
			queryFn: async (registerAccountBody) => {
				try {
					const response = await registerApi(registerAccountBody);
					return { data: response.data };
				} catch (error) {
					return { error };
				}
			},
		}),
		// 3. endpoint quản lý chức năng logout
		logout: build.mutation<{ message: string }, void>({
			queryFn: () => logoutApi(),
		}),
	}),
});
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authenticationSliceApi;
export default authenticationSliceApi;
