// redux toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppSliceInitialStateType, User } from "src/types";
import { getAccessTokenFromLocalStorage, getUserProfileFromLocalStorage } from "src/utils";

const initialState: AppSliceInitialStateType = {
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
		setIsLoggedInAction: (state, action: PayloadAction<boolean>) => {
			const isLoggedIn = action.payload;
			state.isLoggedIn = isLoggedIn;
		},
		setUserProfileAction: (state, action: PayloadAction<User | null>) => {
			const userProfile = action.payload;
			state.userProfile = userProfile;
		},
	},
});
export const { setUserProfileAction, setIsLoggedInAction } = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
