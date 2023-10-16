// http
import { httpInstance as http } from "src/utils";
// urls
import { addToCartPathURL } from "src/constants";
// types:
import { SuccessResponseApi, PurchaseSuccessResponse, ProductItemApiType } from "src/types";

const addToCartApi = (body: ProductItemApiType) =>
	http.post<SuccessResponseApi<PurchaseSuccessResponse>>(addToCartPathURL, body);
export default addToCartApi;
