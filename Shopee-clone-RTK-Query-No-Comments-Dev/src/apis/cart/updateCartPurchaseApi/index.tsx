// http
import { httpInstance as http } from "src/utils";
// urls
import { updatePurchasePathURL } from "src/constants";
// types:
import { ProductItemApiType, PurchaseSuccessResponse, SuccessResponseApi } from "src/types";

// api doc:
// ## Update purchase: `/purchases/update-purchase`

// Method: PUT
// Body:
// ```json
// {
//   "product_id": "60afb1c56ef5b902180aacb8",
//   "buy_count": 3
// }
// ```
// -> Api quản lý tác vụ cập nhật đơn hàng (đơn vẫn đang nằm trong giỏ hàng, chưa thanh toán)
const updateCartPurchaseApi = (body: ProductItemApiType) =>
	http.put<SuccessResponseApi<PurchaseSuccessResponse>>(updatePurchasePathURL, body);
export default updateCartPurchaseApi;
