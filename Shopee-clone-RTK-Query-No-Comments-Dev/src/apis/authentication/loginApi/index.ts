import { loginPathURL } from "src/constants";
// types:
import { RegisterAccountBodyType, AuthenticationResponse } from "src/types";
// http instance
import { httpInstance as http } from "src/utils";

const loginApi = (body: RegisterAccountBodyType) => http.post<AuthenticationResponse>(loginPathURL, body);
export default loginApi;
