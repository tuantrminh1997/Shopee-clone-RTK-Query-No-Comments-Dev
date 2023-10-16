import { User } from "src/types";

interface LoginRegisterLanguagesPropsType {
	isLoggedIn: boolean;
	userProfile: User | null;
	handleLogout: () => void;
	isHeaderForCartLayout?: boolean;
}
export default LoginRegisterLanguagesPropsType;
