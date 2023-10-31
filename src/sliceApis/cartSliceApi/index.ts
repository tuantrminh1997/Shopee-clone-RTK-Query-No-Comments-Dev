import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { PurchaseSuccessResponse, SuccessResponseApi, GetPurchaseListParamsType, ProductItemApiType, BuyProductsApiPropsType } from "src/types";
import { getPurchaseListApi, addToCartApi, updateCartPurchaseApi, buyCheckedPurchaseItemsApi, deletePurchaseItemApi } from "src/apis";

const cartSliceApi = createApi({
	reducerPath: "cartSliceApi",
	tagTypes: ["USER_PURCHASE_LIST"],
	baseQuery: axios,
	endpoints: (build) => ({
		getPurchaseList: build.query<SuccessResponseApi<PurchaseSuccessResponse[]>, GetPurchaseListParamsType>({
			queryFn: async (params: GetPurchaseListParamsType) => {
				try {
					const response = await getPurchaseListApi(params);
					return { data: response.data };
				} catch (error) {
					return { error };
				}
			},
			providesTags: (getPurchaseListResult) => {
				if (getPurchaseListResult) {
					const result = [
						...getPurchaseListResult.data.map((purchaseListResult) => ({
							type: "USER_PURCHASE_LIST" as const,
							id: purchaseListResult._id,
						})),
						{ type: "USER_PURCHASE_LIST" as const, id: "REFETCH_USER_PURCHASE_LIST" },
					];
					return result;
				}
				const result = [{ type: "USER_PURCHASE_LIST" as const, id: "REFETCH_USER_PURCHASE_LIST" }];
				return result;
			},
		}),
		addProductItemToCart: build.mutation<SuccessResponseApi<PurchaseSuccessResponse>, ProductItemApiType>({
			queryFn: (addToCartBody: ProductItemApiType) => addToCartApi(addToCartBody),
			invalidatesTags: (_, addProductItemToCartError) => {
				return addProductItemToCartError ? [] : [{ type: "USER_PURCHASE_LIST" as const, id: "REFETCH_USER_PURCHASE_LIST" }];
			},
		}),
		updateCartPurchase: build.mutation<SuccessResponseApi<PurchaseSuccessResponse>, ProductItemApiType>({
			queryFn: (updateCartPurchaseBody) => updateCartPurchaseApi(updateCartPurchaseBody),
			invalidatesTags: (_, updateCartPurchaseError) => {
				return updateCartPurchaseError ? [] : [{ type: "USER_PURCHASE_LIST" as const, id: "REFETCH_USER_PURCHASE_LIST" }];
			},
		}),
		buyCheckedPurchaseItems: build.mutation<SuccessResponseApi<PurchaseSuccessResponse[]>, BuyProductsApiPropsType<ProductItemApiType>>({
			queryFn: (buyCheckedPurchaseItemsBody) => buyCheckedPurchaseItemsApi(buyCheckedPurchaseItemsBody),
			invalidatesTags: (_, buyCheckedPurchaseItemsError) => {
				return buyCheckedPurchaseItemsError ? [] : [{ type: "USER_PURCHASE_LIST" as const, id: "REFETCH_USER_PURCHASE_LIST" }];
			},
		}),
		deletePurchaseItem: build.mutation<SuccessResponseApi<{ deleted_count: number }>, string[]>({
			queryFn: (purchaseId) => deletePurchaseItemApi(purchaseId),
			invalidatesTags: (_, deletePurchaseItemError) => {
				return deletePurchaseItemError ? [] : [{ type: "USER_PURCHASE_LIST" as const, id: "REFETCH_USER_PURCHASE_LIST" }];
			},
		}),
	}),
});
export const {
	useBuyCheckedPurchaseItemsMutation,
	useGetPurchaseListQuery,
	useAddProductItemToCartMutation,
	useUpdateCartPurchaseMutation,
	useDeletePurchaseItemMutation,
} = cartSliceApi;
export default cartSliceApi;
