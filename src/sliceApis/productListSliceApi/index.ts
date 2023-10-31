import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { Category, ProductListSuccessResponse, SuccessResponseApi, ProductListQueryParamsType } from "src/types";
import { getCategoriesApi, getProductListApi } from "src/apis";

const productListSliceApi = createApi({
	reducerPath: "productListSliceApi",
	baseQuery: axios,
	endpoints: (build) => ({
		getProductList: build.query<SuccessResponseApi<ProductListSuccessResponse>, ProductListQueryParamsType>({
			queryFn: (getProductListQueryParams: ProductListQueryParamsType) => getProductListApi(getProductListQueryParams),
		}),
		getCategories: build.query<SuccessResponseApi<Category[]>, void>({
			queryFn: () => getCategoriesApi(),
		}),
	}),
});
export const { useGetCategoriesQuery, useGetProductListQuery } = productListSliceApi;
export default productListSliceApi;
