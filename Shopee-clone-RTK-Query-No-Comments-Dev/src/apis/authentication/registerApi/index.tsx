// imports:
// types:
import { RegisterAccountBodyType, AuthenticationResponse } from "src/types";
// http instance
import { httpInstance as http } from "src/utils";
import { registerPathURL } from "src/constants";

const registerApi = (body: RegisterAccountBodyType) => http.post<AuthenticationResponse>(registerPathURL, body);
export default registerApi;
