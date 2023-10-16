// http
import { httpInstance as http } from "src/utils";
// urls
import { cartBasePathURL } from "src/constants";
// types:
import { SuccessResponseApi } from "src/types";

// ## Delete purchases: `/purchases`
// Method: DELETE
// body: mảng các `purchase_id`
// ```json
// ["purchase_id"]
// ```

const deletePurchaseItemApi = (purchaseId: string[]) =>
	http.delete<SuccessResponseApi<{ deleted_count: number }>>(cartBasePathURL, {
		// Với phương thức Delete -> truyền vào 1 object
		data: purchaseId,
	});
export default deletePurchaseItemApi;
