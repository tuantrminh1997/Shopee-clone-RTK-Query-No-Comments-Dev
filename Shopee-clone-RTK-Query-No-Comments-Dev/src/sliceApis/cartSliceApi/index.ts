// RTK Query
import { createApi } from "@reduxjs/toolkit/query/react";
// axios
import axios from "axios";
// types
import { PurchaseSuccessResponse, SuccessResponseApi, GetPurchaseListParamsType, ProductItemApiType, BuyProductsApiPropsType } from "src/types";
// apis methods
import { getPurchaseListApi, addToCartApi, updateCartPurchaseApi, buyCheckedPurchaseItemsApi, deletePurchaseItemApi } from "src/apis";

const cartSliceApi = createApi({
	reducerPath: "cartSliceApi",
	tagTypes: ["USER_PURCHASE_LIST"],
	baseQuery: axios,
	endpoints: (build) => ({
		// 1. endpoint quản lý tác vụ call API lấy danh sách giỏ hàng.
		getPurchaseList: build.query<SuccessResponseApi<PurchaseSuccessResponse[]>, GetPurchaseListParamsType>({
			queryFn: async (params: GetPurchaseListParamsType) => {
				try {
					const response = await getPurchaseListApi(params);
					return { data: response.data };
				} catch (error) {
					console.log("get purchasr list error: ", error);
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
		// Nhóm các tác vụ tương tác với State bất đồng bộ Purchase List
		// 1. endpoint quản lý tác vụ add to cart
		addProductItemToCart: build.mutation<SuccessResponseApi<PurchaseSuccessResponse>, ProductItemApiType>({
			queryFn: (addToCartBody: ProductItemApiType) => addToCartApi(addToCartBody),
			invalidatesTags: (_, addProductItemToCartError) => {
				return addProductItemToCartError ? [] : [{ type: "USER_PURCHASE_LIST" as const, id: "REFETCH_USER_PURCHASE_LIST" }];
			},
		}),
		// 2. thay đổi số lượng Purchase Item trong giỏ hàng
		updateCartPurchase: build.mutation<SuccessResponseApi<PurchaseSuccessResponse>, ProductItemApiType>({
			queryFn: (updateCartPurchaseBody) => updateCartPurchaseApi(updateCartPurchaseBody),
			invalidatesTags: (_, updateCartPurchaseError) => {
				return updateCartPurchaseError ? [] : [{ type: "USER_PURCHASE_LIST" as const, id: "REFETCH_USER_PURCHASE_LIST" }];
			},
		}),
		// 3. thanh toán các sản phẩm đã check trong giỏ hàng
		buyCheckedPurchaseItems: build.mutation<SuccessResponseApi<PurchaseSuccessResponse[]>, BuyProductsApiPropsType<ProductItemApiType>>({
			queryFn: (buyCheckedPurchaseItemsBody) => buyCheckedPurchaseItemsApi(buyCheckedPurchaseItemsBody),
			invalidatesTags: (_, buyCheckedPurchaseItemsError) => {
				return buyCheckedPurchaseItemsError ? [] : [{ type: "USER_PURCHASE_LIST" as const, id: "REFETCH_USER_PURCHASE_LIST" }];
			},
		}),
		// 4. xoá purchase Item trong giỏ hàng
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
