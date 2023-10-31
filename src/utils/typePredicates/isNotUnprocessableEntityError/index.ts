import { HttpStatusCode } from "src/types";
import { isAxiosErrorTypePredicateMethod } from "src/utils";

export default function isNotUnprocessableEntityError(error: unknown) {
	return isAxiosErrorTypePredicateMethod(error) && error.response?.status !== HttpStatusCode.UnprocessableEntity;
}
