const purchaseStatus = {
	inCart: -1,
	allPurschases: 0,
	waitingForShop: 1,
	gettingFromShop: 2,
	purchaseDelivering: 3,
	purchaseDelivered: 4,
	purchaseCanceled: 5,
} as const;
export default purchaseStatus;
