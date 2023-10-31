import { isAxiosError, AxiosError } from "axios";

export default function isAxiosErrorTypePredicateMethod<T>(error: unknown): error is AxiosError<T> {
	return isAxiosError(error);
}
