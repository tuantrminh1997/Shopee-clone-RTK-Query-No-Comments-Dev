import { ExtendPurchaseSuccessResponse, User } from "src/types";

interface AppContextInterface {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	userProfile: User | null;
	setUserProfile: React.Dispatch<React.SetStateAction<User | null>>;
	extendPurchaseList: ExtendPurchaseSuccessResponse[];
	setExtendPurchaseList: React.Dispatch<React.SetStateAction<ExtendPurchaseSuccessResponse[]>>;
	resetIsLoggedInUserProfile: () => void;
}
export default AppContextInterface;
