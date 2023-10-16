import { User, SuccessResponseApi } from "src/types";

type AuthenticationSuccessResponse = SuccessResponseApi<{
	/**
   * Định nghĩa cho khối object data nằm trong response của chức năng Register khi success có cấu trúc như sau:
      "data": {
        "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzMTIxMjEyMTJlcjJAZ21haWwuY29tIiwiaWQiOiI2NGRjNTBhZDNiZTU3NmRkNTNkMmFiNWYiLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTE2VDA0OjI5OjMzLjQ5N1oiLCJpYXQiOjE2OTIxNjAxNzMsImV4cCI6MTY5Mjc2NDk3M30.KjSB_L6ztZm7CzhvbmgI5z_wZaVptFuI7XpWBgIq5xk",
        "expires": 604800,
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzMTIxMjEyMTJlcjJAZ21haWwuY29tIiwiaWQiOiI2NGRjNTBhZDNiZTU3NmRkNTNkMmFiNWYiLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTE2VDA0OjI5OjMzLjQ5N1oiLCJpYXQiOjE2OTIxNjAxNzMsImV4cCI6MTcwMDgwMDE3M30.XF9lJLPod5nogsDRoC8Neb0zB1g7Kp2kyDdElQa2RqQ",
        "expires_refresh_token": 8640000,
        "user": {
            "roles": ["User"],
            "_id": "64dc50ad3be576dd53d2ab5f",
            "email": "us12121212er2@gmail.com",
            "createdAt": "2023-08-16T04:29:33.481Z",
            "updatedAt": "2023-08-16T04:29:33.481Z",
            "__v": 0
        }
    }
   */
	/**
	 * Truyền đối số cho generic Parameter tại
	 */
	access_token: string;
	refresh_token: string;
	expires: number;
	expires_refresh_token: number;
	user: User;
}>;
export default AuthenticationSuccessResponse;
