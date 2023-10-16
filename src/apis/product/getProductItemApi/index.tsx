// http
import { httpInstance as http } from "src/utils";
// types
import { SuccessResponseApi, ProductItemSuccessResponse } from "src/types";
// pathUrl
import { productsBasePathURL } from "src/constants";

const getProductItemApi = (productItemId: string) =>
	// Đặt data type của response vào đây
	http.get<SuccessResponseApi<ProductItemSuccessResponse>>(`${productsBasePathURL}/${productItemId}`);

export default getProductItemApi;
