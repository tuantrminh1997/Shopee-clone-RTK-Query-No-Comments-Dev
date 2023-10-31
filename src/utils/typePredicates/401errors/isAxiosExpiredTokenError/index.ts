import { isAxiosUnauthorizedError } from "src/utils";
import { AxiosError } from "axios";
import { ErrorResponseApi } from "src/types";

export default function isAxiosExpiredTokenError<ExpiredTokenError>(error: unknown): error is AxiosError<ExpiredTokenError> {
	return (
		isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error) &&
		(error.response?.data as ErrorResponseApi<{ name: string; message: string }>)?.data?.name === "EXPIRED_TOKEN"
	);
}
