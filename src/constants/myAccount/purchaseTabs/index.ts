import { purchaseStatus } from "src/constants";

const purchaseTabs = [
	{ status: purchaseStatus.allPurschases, title: "Tất cả" },
	{ status: purchaseStatus.waitingForShop, title: "Chờ xác nhận" },
	{ status: purchaseStatus.gettingFromShop, title: "Chờ lấy hàng" },
	{ status: purchaseStatus.purchaseDelivering, title: "Đang giao" },
	{ status: purchaseStatus.purchaseDelivered, title: "Đã giao" },
	{ status: purchaseStatus.purchaseCanceled, title: "Đã hủy" },
];
export default purchaseTabs;
