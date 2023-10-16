// http instance
import { httpInstance as http } from "src/utils";
import { logoutPathURL } from "src/constants";

const logoutApi = () => http.post(logoutPathURL);
export default logoutApi;
