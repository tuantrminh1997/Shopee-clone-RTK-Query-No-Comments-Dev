/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { paths } from "src/constants";
import { convert } from "html-to-text";
import { getIdFromNameId } from "src/utils";
import { useGetProductListQuery } from "src/sliceApis/productListSliceApi";
import { useGetProductItemDetailQuery } from "src/sliceApis/productItemDetailSliceApi";
import { useAddProductItemToCartMutation } from "src/sliceApis/cartSliceApi";
import { QueryConfigType, ProductItemSuccessResponse, ProductListSuccessResponse, SuccessResponseApi, PurchaseSuccessResponse } from "src/types";
import {
	ProductItemInformation,
	ProductItemImages,
	BreadCrum,
	RelatedInformations,
	SkeletonLoadingProductInformation,
	SkeletonLoadingRelatedInformations,
} from "./components";

export default function ProductItemDetail() {
	const { cart: cartUrl } = paths;
	const navigate = useNavigate();
	const [addProductItemToCartMutation] = useAddProductItemToCartMutation();
	const { itemNameId } = useParams();
	const idFromNameId = getIdFromNameId(itemNameId as string);

	const { data: productItemDetailQueryData } = useGetProductItemDetailQuery(idFromNameId);

	const productItemDetailData: ProductItemSuccessResponse | undefined = useMemo(() => productItemDetailQueryData?.data, [productItemDetailQueryData]);

	const productItemCategoryId: string | undefined = useMemo(() => productItemDetailQueryData?.data.category._id, [productItemDetailQueryData]);

	const queryConfigOverrideCategory: QueryConfigType = useMemo(
		() => ({ page: "1", limit: "20", category: productItemCategoryId }),
		[productItemCategoryId],
	);

	const queryConfigOverrideCategorySoldBy: QueryConfigType = useMemo(
		() => ({ page: "1", limit: "20", category: productItemCategoryId, sort_by: "sold" }),
		[productItemCategoryId],
	);

	const { data: similarProductListQueryData } = useGetProductListQuery(queryConfigOverrideCategory);

	const { data: similarSoldByProductListQueryData } = useGetProductListQuery(queryConfigOverrideCategorySoldBy);

	const [numberOfProducts, setNumberOfProducts] = useState<number>(1);
	const handleSetNumberOfProducts: (value: number) => void = (value: number) => {
		setNumberOfProducts(value);
	};

	const handleAddToCart = async () => {
		await addProductItemToCartMutation({
			product_id: productItemDetailQueryData?.data._id as string,
			buy_count: numberOfProducts,
		})
			.unwrap()
			.then((data) => {
				const successMessage = data.message;
				toast.success(successMessage, {
					position: "top-center",
					autoClose: 2000,
				});
			});
	};

	const handleBuyNow = async () => {
		const response = await addProductItemToCartMutation({
			product_id: productItemDetailData?._id as string,
			buy_count: numberOfProducts,
		});
		const purchaseProductItemDetail = (
			response as {
				data: SuccessResponseApi<PurchaseSuccessResponse>;
			}
		).data.data;
		navigate(cartUrl, {
			state: {
				purchaseProductItemDetailId: purchaseProductItemDetail._id,
			},
		});
	};

	return (
		<div
			className={`flex flex-col items-center justify-between my-5 w-[1200px] ${!productItemDetailData ? "min-h-[1000px]" : ""} lg:h-fit xl:w-screen`}
		>
			{productItemDetailData && (
				<Helmet>
					<title>{productItemDetailData.name as string} | Shopee clone</title>
					<meta
						name='description'
						content={
							`${convert(productItemDetailData.description as string, {
								wordwrap: 120,
							})}` as string
						}
					/>
				</Helmet>
			)}
			{productItemDetailQueryData && (
				<BreadCrum
					productItemName={productItemDetailQueryData.data.name as string}
					productItemCategory={productItemDetailQueryData.data.category.name as string}
					categoryId={productItemDetailQueryData.data.category._id as string}
				/>
			)}

			{!productItemDetailData && !productItemDetailQueryData && <SkeletonLoadingProductInformation />}
			{productItemDetailData && productItemDetailQueryData && (
				<div className='flex justify-between w-full bg-white rounded-sm lg:flex-col'>
					<ProductItemImages
						productItemDetailDatasImage={productItemDetailData.image}
						productItemDetailDatasImages={productItemDetailData.images}
						productItemName={productItemDetailQueryData.data.name as string}
					/>
					<ProductItemInformation
						productItemDetailData={productItemDetailData}
						setNumberOfProducts={setNumberOfProducts}
						handleSetNumberOfProducts={handleSetNumberOfProducts}
						numberOfProducts={numberOfProducts}
						handleAddToCart={handleAddToCart}
						handleBuyNow={handleBuyNow}
						itemNameId={itemNameId as string}
					/>
				</div>
			)}
			{!similarProductListQueryData && <SkeletonLoadingRelatedInformations />}
			{similarProductListQueryData && (
				<RelatedInformations
					similarProductListQueryData={similarProductListQueryData}
					productItemDescription={productItemDetailQueryData?.data.description as string}
					similarSoldByProductListQueryData={similarSoldByProductListQueryData as SuccessResponseApi<ProductListSuccessResponse>}
				/>
			)}
		</div>
	);
}
