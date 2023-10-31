import { SuccessResponseApi } from "src/types";
type RefreshTokenResponseType = SuccessResponseApi<{ access_token: string }>;
export default RefreshTokenResponseType;
