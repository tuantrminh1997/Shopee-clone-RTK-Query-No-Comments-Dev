import { httpInstance as http } from "src/utils";
// url
import { buyProductsPathURL } from "src/constants";
// types
import { BuyProductsApiPropsType, ProductItemApiType, PurchaseSuccessResponse, SuccessResponseApi } from "src/types";

const buyCheckedPurchaseItemsApi = (body: BuyProductsApiPropsType<ProductItemApiType>) =>
	http.post<SuccessResponseApi<PurchaseSuccessResponse[]>>(buyProductsPathURL, body);
export default buyCheckedPurchaseItemsApi;
