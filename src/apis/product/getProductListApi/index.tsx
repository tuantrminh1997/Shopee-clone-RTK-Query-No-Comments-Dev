// utils -> http
import { httpInstance as http } from "src/utils";
// types
import { ProductListQueryParams, SuccessResponseApi, ProductListSuccessResponse, QueryConfigType } from "src/types";
// url
import { productsBasePathURL } from "src/constants";

const getProductListApi = (params: ProductListQueryParams | QueryConfigType) =>
	// Đặt data type của response vào đây
	http.get<SuccessResponseApi<ProductListSuccessResponse>>(productsBasePathURL, {
		params,
	});
export default getProductListApi;
