import { PurchaseSuccessResponse } from "src/types";

interface ExtendPurchaseSuccessResponse extends PurchaseSuccessResponse {
	isCheck: boolean;
	disabled: boolean;
}
export default ExtendPurchaseSuccessResponse;
