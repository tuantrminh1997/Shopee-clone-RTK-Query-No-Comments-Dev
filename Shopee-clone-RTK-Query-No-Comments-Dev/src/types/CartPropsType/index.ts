import { PurchaseSuccessResponse } from "src/types";

interface CartPropsType {
	purchaseList: PurchaseSuccessResponse[] | undefined;
	isLoggedIn: boolean;
}
export default CartPropsType;
