// RTK Query
import { createApi } from "@reduxjs/toolkit/query/react";
// axios
import axios from "axios";
// types
import { Category, ProductListSuccessResponse, SuccessResponseApi, ProductListQueryParamsType } from "src/types";
// api methods
import { getCategoriesApi, getProductListApi } from "src/apis";

const productListSliceApi = createApi({
	reducerPath: "productListSliceApi",
	baseQuery: axios,
	endpoints: (build) => ({
		// 1. endpoint quản lý tác vụ call API get Product List
		getProductList: build.query<SuccessResponseApi<ProductListSuccessResponse>, ProductListQueryParamsType>({
			queryFn: (getProductListQueryParams: ProductListQueryParamsType) => getProductListApi(getProductListQueryParams),
		}),
		// 2. endpoint quản lý tác vụ call API get Categories
		getCategories: build.query<SuccessResponseApi<Category[]>, void>({
			queryFn: () => getCategoriesApi(),
		}),
	}),
});
export const { useGetCategoriesQuery, useGetProductListQuery } = productListSliceApi;
export default productListSliceApi;
