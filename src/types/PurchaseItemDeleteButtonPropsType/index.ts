interface PurchaseItemDeleteButtonPropsType {
	handleDeletePurchaseItem?: (purchaseItemIndex: number) => () => void;
	extendPurchaseItemIndex?: number;
	deleteActionTitle: string;
}
export default PurchaseItemDeleteButtonPropsType;
