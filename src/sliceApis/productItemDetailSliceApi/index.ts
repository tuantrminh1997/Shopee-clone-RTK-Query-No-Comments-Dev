import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { SuccessResponseApi, ProductItemSuccessResponse } from "src/types";
import { getProductItemApi } from "src/apis";

const productItemDetailSliceApi = createApi({
	reducerPath: "productItemDetailSliceApi",
	baseQuery: axios,
	endpoints: (build) => ({
		getProductItemDetail: build.query<SuccessResponseApi<ProductItemSuccessResponse>, string>({
			queryFn: (productItemId) => getProductItemApi(productItemId),
		}),
	}),
});
export const { useGetProductItemDetailQuery } = productItemDetailSliceApi;
export default productItemDetailSliceApi;
