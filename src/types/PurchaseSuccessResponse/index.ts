import { ProductItemSuccessResponse } from "src/types";

// Thông tin `status`:

// - -1: Sản phẩm đang trong giỏ hàng
// - 0: Tất cả sản phâm
// - 1: Sản phẩm đang đợi xác nhận từ chủ shop
// - 2: Sản phẩm đang được lấy hàng
// - 3: Sản phẩm đang vận chuyển
// - 4: San phẩm đã được giao
// - 5: Sản phẩm đã bị hủy
// -> khi muốn lấy ra các sản phẩm đang nằm trong giỏ hàng -> gửi API lên với status = -1
// tương tự khi muốn lấy tấT cả sản phẩm -> gửi lên 0
type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5;
// tuy nhiên giá trị 0 không nằm trong status items, nó là 1 giá trị riêng và đặc biệt bởi vì nó chỉ dành cho việc lấy nhiều sản phẩm
// -> PurchaseListStatus kế thừa lại PurchaseStatus và thêm giá trị 0.
type PurchaseListStatus = PurchaseStatus | 0;

interface PurchaseSuccessResponse {
	_id: string;
	buy_count: number;
	price: number;
	price_before_discount: number;
	status: PurchaseListStatus;
	user: string;
	product: ProductItemSuccessResponse;
	createdAt: string;
	updatedAt: string;
}
export default PurchaseSuccessResponse;
