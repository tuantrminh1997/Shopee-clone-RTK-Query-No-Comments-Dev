import { describe, it, expect, beforeEach } from "vitest";
import { User } from "src/types";
// tác vụ lưu
import saveAccessTokenToLocalStorage from "src/utils/authentication/accessToken/saveAccessTokenToLocalStorage";
import saveRefreshTokenToLocalStorage from "src/utils/authentication/refreshToken/saveRefreshTokenToLocalStorage";
import saveUserProfileToLocalStorage from "src/utils/authentication/userProfile/saveUserProfileToLocalStorage";
// tác vụ get
import getAccessTokenFromLocalStorage from "src/utils/authentication/accessToken/getAccessTokenFromLocalStorage";
import getRefreshTokenFromLocalStorage from "src/utils/authentication/refreshToken/getRefreshTokenFromLocalStorage";
import getUserProfileFromLocalStorage from "src/utils/authentication/userProfile/getUserProfileFromLocalStorage";
// tác vụ clear
import clearAccessTokenFromLocalStorage from "src/utils/authentication/accessToken/clearAccessTokenFromLocalStorage";
import clearRefreshTokenFromLocalStorage from "src/utils/authentication/refreshToken/clearRefreshTokenFromLocalStorage";
import clearUserProfileFromLocalStorage from "src/utils/authentication/userProfile/clearUserProfileFromLocalStorage";

// Sử dụng js-dom để test các hàm util authentication
const access_token: string =
	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTJlZmMxM2JlNTc2ZGQ1M2QyYjM2YiIsImVtYWlsIjoicXVlbmNodXllbmJ1b25kaW5hbzJAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOS0xOVQwMjoyNzoyNi4zMjdaIiwiaWF0IjoxNjk1MDkwNDQ2LCJleHAiOjE2OTUwOTA3NDZ9.91jo__F7u2lb-b4tD47elOxErUxhympoja8yYvbhOKw";
const refresh_token: string =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTJlZmMxM2JlNTc2ZGQ1M2QyYjM2YiIsImVtYWlsIjoicXVlbmNodXllbmJ1b25kaW5hbzJAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOS0xOVQwMjo0Mzo1NS44MzZaIiwiaWF0IjoxNjk1MDkxNDM1LCJleHAiOjE2OTUwOTUwMzV9.IArOqZYIsVXufkBGCsBtXEJg8ACt1y7LbtFhePNVvuw";
const userProfile: User = {
	_id: "64e2efc13be576dd53d2b36b",
	roles: ["User"],
	email: "quenchuyenbuondinao2@gmail.com",
	createdAt: "2023-08-21T05:01:53.301Z",
	updatedAt: "2023-09-18T04:08:32.572Z",
	address: "Tương Mai, Hoàng Mai, Hà Nội",
	date_of_birth: "1990-02-11T17:00:00.000Z",
	name: "trần minh tuấn",
	phone: "0962526673",
	avatar: "a3e90c02-e1fc-4e73-919d-bd273d036a3c.png",
};

// trước khi gọi mỗi callback của it để test đều gọi callback của beforeEach 1 lần -> clear local storage
beforeEach(() => {
	// Chú ý: localStorage này không phải Browser API mà chính là từ jsdom
	// chúng ta đang chạy trên terminal và terminal đang được set môi trường là jsdom
	localStorage.clear();
});

// 1. tác vụ lưu
// desscribe test saveAccessTokenToLocalStorage
describe("saveAccessTokenToLocalStorage", () => {
	it("lưu access_token vào local storage thành công", () => {
		// chạy hàm saveAccessTokenToLocalStorage lưu access_token vào local storage
		saveAccessTokenToLocalStorage(access_token as string);
		// ta mong đợi sẽ lấy được access_tọken sau khi lưu
		expect(localStorage.getItem("access_token")).toBe(access_token);
	});
});

// -> làm tương tự với hàm thực thi tác vụ lưu refresh_token
// describe test saveRefreshTokenToLocalStorage
describe("saveRefreshTokenToLocalStorage", () => {
	it("lưu refresh_token vào local storage thành công", () => {
		saveRefreshTokenToLocalStorage(refresh_token as string);
		// toBe có thể kiểm tra cả về mặt tham chiếu (ví dụ 2 object)
		expect(localStorage.getItem("refresh_token")).toBe(refresh_token);
	});
});

describe("saveUserProfileToLocalStorage", () => {
	it("lưu user_profile vào local storage thành công", () => {
		saveUserProfileToLocalStorage(userProfile as User);
		// toEqual kiểm tra về mặt value của 2 object giống hệt nhau (khác tham chiếu)
		// toBe -> vì toBe sẽ kiểm tra tận gốc cả về tham chiếu, do đây là 2 object khác nhau về tham chiếu -> fail test
		// toEqual -> vì toEqual chỉ kiểm tra về mặt value của object, ko quan tâm tới tham chiếu -> pass test
		expect(JSON.parse(localStorage.getItem("userProfile") as string)).toEqual(userProfile);
	});
});

// 2. tác vụ get
describe("getAccessTokenFromLocalStorage", () => {
	it("lấy access_token từ local storage thành công", () => {
		saveAccessTokenToLocalStorage(access_token as string);
		expect(getAccessTokenFromLocalStorage()).toBe(access_token);
	});
});
describe("getRefreshTokenFromLocalStorage", () => {
	it("lấy refresh token từ local storage thành công", () => {
		saveRefreshTokenToLocalStorage(refresh_token as string);
		expect(getRefreshTokenFromLocalStorage()).toBe(refresh_token);
	});
});
describe("getAccessTokenFromLocalStorage", () => {
	it("lấy user profile từ local storage thành công", () => {
		saveUserProfileToLocalStorage(userProfile as User);
		expect(getUserProfileFromLocalStorage()).toEqual(userProfile);
	});
});

// 3. tác vụ clear
// -> lưu
// -> clear
// -> mong đợi get ra chuỗi rỗng
describe("clear access_token", () => {
	it("clear access_token khỏi local storage thành công", () => {
		saveAccessTokenToLocalStorage(access_token as string);
		clearAccessTokenFromLocalStorage();
		expect(getAccessTokenFromLocalStorage()).toBe("");
	});
});
describe("clear refresh_token", () => {
	it("clear refresh_token khỏi local storage thành công", () => {
		saveRefreshTokenToLocalStorage(refresh_token as string);
		clearRefreshTokenFromLocalStorage();
		expect(getRefreshTokenFromLocalStorage()).toBe("");
	});
});
describe("clear user_profile", () => {
	it("clear user_profile khỏi local storage thành công", () => {
		saveUserProfileToLocalStorage(userProfile as User);
		clearUserProfileFromLocalStorage();
		expect(getUserProfileFromLocalStorage()).toEqual(null);
	});
});
