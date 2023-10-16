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
export default PurchaseStatus;
