/* eslint-disable @typescript-eslint/no-explicit-any */
// types:
// sử dụng enum HttpStatusCode do ta chép từ thư viện axios sang:
import { HttpStatusCode } from "src/types";

export default function isUnprocessableEntityError<FormError>(error: unknown): error is { status: 422; data: FormError } {
	return typeof error === "object" && error !== null && (error as any).status === HttpStatusCode.UnprocessableEntity;
}
