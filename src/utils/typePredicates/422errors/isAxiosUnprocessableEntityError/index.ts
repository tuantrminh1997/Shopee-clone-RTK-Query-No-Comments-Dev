import { AxiosError } from "axios";
import { isAxiosErrorTypePredicateMethod } from "src/utils";
import { HttpStatusCode } from "src/types";

export default function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
	return isAxiosErrorTypePredicateMethod(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}
