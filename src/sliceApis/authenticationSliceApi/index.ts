/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosResponse } from "axios";
import { registerApi, logoutApi, loginApi } from "src/apis";
import { RegisterAccountBodyType, AuthenticationResponse } from "src/types";

const authenticationSliceApi = createApi({
	reducerPath: "authenticationSliceApi",
	baseQuery: axios,
	endpoints: (build) => ({
		login: build.mutation<AxiosResponse<AuthenticationResponse, any>, RegisterAccountBodyType>({
			queryFn: async (loginBody) => {
				try {
					const response = await loginApi(loginBody);
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
		logout: build.mutation<{ message: string }, void>({
			queryFn: () => logoutApi(),
		}),
	}),
});
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authenticationSliceApi;
export default authenticationSliceApi;
