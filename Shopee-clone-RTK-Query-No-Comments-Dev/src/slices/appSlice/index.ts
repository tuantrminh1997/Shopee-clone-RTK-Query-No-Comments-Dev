// redux toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppSliceInitialStateType, User } from "src/types";
import { getAccessTokenFromLocalStorage, getUserProfileFromLocalStorage } from "src/utils";

const initialState: AppSliceInitialStateType = {
	// global state:
	// 1. isLoggedIn: state quản lý trạng thái đăng nhập
	// 2. userProfile: userProfile trả về từ server
	isLoggedIn: Boolean(getAccessTokenFromLocalStorage()),
	userProfile:
		getUserProfileFromLocalStorage() !== null && getUserProfileFromLocalStorage().data
			? getUserProfileFromLocalStorage().data.user
			: getUserProfileFromLocalStorage(),
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		// 1. action quản lý chức năng thay đổi trạng thái đăng nhập ứng dụng
		setIsLoggedInAction: (state, action: PayloadAction<boolean>) => {
			const isLoggedIn = action.payload;
			state.isLoggedIn = isLoggedIn;
		},
		// 2. action quản lý chức năng lưu thông tin user đang đăng nhập
		setUserProfileAction: (state, action: PayloadAction<User | null>) => {
			const userProfile = action.payload;
			state.userProfile = userProfile;
		},
	},
});
export const { setUserProfileAction, setIsLoggedInAction } = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
