import { AxiosError } from "axios";
import { isAxiosErrorTypePredicateMethod } from "src/utils";
import { HttpStatusCode } from "src/types";

export default function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
	return isAxiosErrorTypePredicateMethod(error) && error.response?.status === HttpStatusCode.Unauthorized;
}
