import { PurchaseStatus } from "src/types";
// tuy nhiên giá trị 0 không nằm trong status items, nó là 1 giá trị riêng và đặc biệt bởi vì nó chỉ dành cho việc lấy nhiều sản phẩm
// -> PurchaseListStatus kế thừa lại PurchaseStatus và thêm giá trị 0.
type PurchaseListStatus = PurchaseStatus | 0;
export default PurchaseListStatus;
