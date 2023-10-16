// http
import { httpInstance as http } from "src/utils";
// urls
import { getPurchaseListPathURL } from "src/constants";
// types:
import { PurchaseListStatus, PurchaseSuccessResponse, SuccessResponseApi } from "src/types";

const getPurchaseListApi = (params: { status: PurchaseListStatus }) =>
	http.get<SuccessResponseApi<PurchaseSuccessResponse[]>>(getPurchaseListPathURL, { params });
export default getPurchaseListApi;
