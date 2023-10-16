import { User } from "src/types";

interface AppSliceInitialStateType {
	isLoggedIn: boolean;
	userProfile: User | null;
}
export default AppSliceInitialStateType;
