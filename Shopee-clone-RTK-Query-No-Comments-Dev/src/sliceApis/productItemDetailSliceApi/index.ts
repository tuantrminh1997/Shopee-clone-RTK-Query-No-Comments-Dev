// RTK Query
import { createApi } from "@reduxjs/toolkit/query/react";
// axios
import axios from "axios";
// types
import { SuccessResponseApi, ProductItemSuccessResponse } from "src/types";
// apis
import { getProductItemApi } from "src/apis";

const productItemDetailSliceApi = createApi({
	reducerPath: "productItemDetailSliceApi",
	baseQuery: axios,
	endpoints: (build) => ({
		// 1. endpoint quản lý tác vụ call API get Product Item Detail Information
		getProductItemDetail: build.query<SuccessResponseApi<ProductItemSuccessResponse>, string>({
			queryFn: (productItemId) => getProductItemApi(productItemId),
		}),
	}),
});
export const { useGetProductItemDetailQuery } = productItemDetailSliceApi;
export default productItemDetailSliceApi;
