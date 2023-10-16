type ErrorResponseType<T> = {
	status: number;
	data: T;
};
export default ErrorResponseType;
