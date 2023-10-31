// http
import { httpInstance as http } from "src/utils";
// urls
import { updatePurchasePathURL } from "src/constants";
// types:
import { ProductItemApiType, PurchaseSuccessResponse, SuccessResponseApi } from "src/types";

const updateCartPurchaseApi = (body: ProductItemApiType) => http.put<SuccessResponseApi<PurchaseSuccessResponse>>(updatePurchasePathURL, body);
export default updateCartPurchaseApi;
