/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticationSuccessResponse } from "src/types";

interface LoginRegisterFulfilledAction {
	type: string;
	payload: AuthenticationSuccessResponse;
	meta?: any;
}
export default LoginRegisterFulfilledAction;
