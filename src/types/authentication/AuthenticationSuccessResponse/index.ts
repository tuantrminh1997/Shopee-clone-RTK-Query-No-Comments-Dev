import { User, SuccessResponseApi } from "src/types";

type AuthenticationSuccessResponse = SuccessResponseApi<{
	access_token: string;
	refresh_token: string;
	expires: number;
	expires_refresh_token: number;
	user: User;
}>;
export default AuthenticationSuccessResponse;
