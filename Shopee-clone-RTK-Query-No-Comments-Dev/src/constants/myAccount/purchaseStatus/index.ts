const purchaseStatus = {
	// - -1: Sản phẩm đang trong giỏ hàng
	inCart: -1,
	// - 0: Tất cả sản phẩm
	allPurschases: 0,
	// - 1: Sản phẩm đang đợi xác nhận từ chủ shop
	waitingForShop: 1,
	// - 2: Sản phẩm đang được lấy hàng
	gettingFromShop: 2,
	// - 3: Sản phẩm đang vận chuyển
	purchaseDelivering: 3,
	// - 4: San phẩm đã được giao
	purchaseDelivered: 4,
	// - 5: Sản phẩm đã bị hủy
	purchaseCanceled: 5,
} as const;
export default purchaseStatus;
