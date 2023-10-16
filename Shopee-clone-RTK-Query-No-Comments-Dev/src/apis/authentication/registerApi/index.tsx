// imports:
// types:
import { RegisterAccountBodyType, AuthenticationResponse } from "src/types";
// http instance
import { httpInstance as http } from "src/utils";
import { registerPathURL } from "src/constants";
/**
 * function thực hiện tác vụ đăng ký account
 * -> truyền lên server body: { email: string; password: string }
 * -> nhận về response:
 * {
      "message": "Đăng ký thành công",
      "data": {
        "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxNUBnbWFpbC5jb20iLCJpZCI6IjYwYzZmNGViNGVhMWRlMzg5ZjM1NjA1YiIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjEtMDYtMTRUMDY6MTk6MjMuNzQ5WiIsImlhdCI6MTYyMzY1MTU2MywiZXhwIjoxNjI0MjU2MzYzfQ.WbNgnd4cewdDNpx-ZLebk1kLgogLctBqgh9fc9Mb3yg",
        "expires": "7d",
        "user": {
          "roles": ["User"],
          "_id": "60c6f4eb4ea1de389f35605b",
          "email": "user15@gmail.com",
          "createdAt": "2021-06-14T06:19:23.703Z",
          "updatedAt": "2021-06-14T06:19:23.703Z",
          "__v": 0
        }
      }
    }
 */
const registerApi = (body: RegisterAccountBodyType) => http.post<AuthenticationResponse>(registerPathURL, body);
/**
 * Function quản lý tác vụ call API cho chức năng register được import vào component Register, cùng với React Query thực hiện
 * chức năng call API cho Register
 */
export default registerApi;
