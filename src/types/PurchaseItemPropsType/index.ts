import { ExtendPurchaseSuccessResponse } from "src/types";
import { ChangeEvent } from "react";

interface PurchaseItemPropsType {
	extendPurchaseItem?: ExtendPurchaseSuccessResponse;
	extendPurchaseItemIndex?: number;
	handleCheck?: (purchaseItemIndex: number) => (event: ChangeEvent<HTMLInputElement>) => void;
	handleUpdateQuantityPurchaseItem?: (purchaseItemIndex: number, buyCountValue: number, enable: boolean) => void;
	handleTypeQuantity?: (purchaseItemIndex: number) => (value: number) => void;
	handleDeletePurchaseItem?: (purchaseItemIndex: number) => () => void;
	purchaseItemBuyCount?: number;
	itemNameId?: string | undefined;
}
export default PurchaseItemPropsType;
