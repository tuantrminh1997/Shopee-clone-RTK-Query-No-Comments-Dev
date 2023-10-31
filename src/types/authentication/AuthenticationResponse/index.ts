import { User, ResponseApi } from "src/types";

type AuthenticationResponse = ResponseApi<{
	access_token: string;
	expires: number;
	user: User;
}>;
export default AuthenticationResponse;
