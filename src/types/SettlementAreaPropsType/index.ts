import { ExtendPurchaseSuccessResponse } from "src/types";

interface SettlementAreaPropsType {
	isCheckFull: boolean;
	handleCheckFull: () => void;
	extendPurchaseList: ExtendPurchaseSuccessResponse[];
	handleDeletePurchaseItems: () => void;
	checkedPurchaseItemsCount: number;
	getTotalCheckedPurchaseItemsPrice: () => number;
	getTotalCheckedPurchaseItemsSavingPrice: () => number | null;
	handleBuyCheckedPurchaseItems: () => void;
	buyCheckedPurchaseItemsIsLoading: boolean;
}
export default SettlementAreaPropsType;
