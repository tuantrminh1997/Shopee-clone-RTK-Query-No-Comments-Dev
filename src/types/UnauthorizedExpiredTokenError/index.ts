import { ErrorResponseType, ErrorResponseApi } from "src/types";

interface UnauthorizedExpiredTokenError {
	payload: ErrorResponseType<ErrorResponseApi<{ message: string; name: "EXPIRED_TOKEN" }>>;
	meta: {
		arg: {
			endpointName: string;
		};
	};
}
export default UnauthorizedExpiredTokenError;
