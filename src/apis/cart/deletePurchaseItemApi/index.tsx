// http
import { httpInstance as http } from "src/utils";
// urls
import { cartBasePathURL } from "src/constants";
// types:
import { SuccessResponseApi } from "src/types";

const deletePurchaseItemApi = (purchaseId: string[]) =>
	http.delete<SuccessResponseApi<{ deleted_count: number }>>(cartBasePathURL, {
		data: purchaseId,
	});
export default deletePurchaseItemApi;
