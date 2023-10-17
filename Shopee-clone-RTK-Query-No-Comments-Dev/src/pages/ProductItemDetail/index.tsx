/* eslint-disable @typescript-eslint/no-explicit-any */
// react hooks:
import { useState, useMemo } from "react";
// react-router-dom
import { useParams, useNavigate } from "react-router-dom";
// Sử dụng {Helmet} từ react helmet async thay vì { Helmet } từ react-helmet -> handle vấn đề báo lỗi ở console Using UNSAFE_componentWillMount ...v...v.....
import { Helmet } from "react-helmet-async";
// react toastify:
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// constants:
import { paths } from "src/constants";
// html to text:
import { convert } from "html-to-text";
// apis:
// utils:
import { getIdFromNameId } from "src/utils";
// RTK Query hooks
import { useGetProductListQuery } from "src/sliceApis/productListSliceApi";
import { useGetProductItemDetailQuery } from "src/sliceApis/productItemDetailSliceApi";
import { useAddProductItemToCartMutation } from "src/sliceApis/cartSliceApi";
// types:
import { QueryConfigType, ProductItemSuccessResponse, ProductListSuccessResponse, SuccessResponseApi, PurchaseSuccessResponse } from "src/types";
// private components:
import {
	ProductItemInformation,
	ProductItemImages,
	BreadCrum,
	RelatedInformations,
	SkeletonLoadingProductInformation,
	SkeletonLoadingRelatedInformations,
} from "./components";

export default function ProductItemDetail() {
	// constants:
	const { cart: cartUrl } = paths;
	// navigate
	const navigate = useNavigate();
	const [addProductItemToCartMutation] = useAddProductItemToCartMutation();

	const { itemNameId } = useParams();

	// Dùng function getIdFromNameId ta khai báo tại src/utils -> lấy ra chuỗi Id nằm trong đoạn mã tổng hợp của cả name và id
	const idFromNameId = getIdFromNameId(itemNameId as string);

	// Khai báo query thực hiện tác vụ callApi và lưu vào cached khi Component ProductItemDetail được mounted:
	const { data: productItemDetailQueryData } = useGetProductItemDetailQuery(idFromNameId);

	const productItemDetailData: ProductItemSuccessResponse | undefined = useMemo(() => productItemDetailQueryData?.data, [productItemDetailQueryData]);

	// Handle chức năng get Item theo CategoryId === Items cùng thể loại
	const productItemCategoryId: string | undefined = useMemo(() => productItemDetailQueryData?.data.category._id, [productItemDetailQueryData]);

	// Handle chức năng get Item theo CategoryId === Items cùng thể loại
	const queryConfigOverrideCategory: QueryConfigType = useMemo(
		() => ({ page: "1", limit: "20", category: productItemCategoryId }),
		[productItemCategoryId],
	);

	// Handle chức năng get Item theo CategoryId và bán chạy === Items cùng thể loại
	const queryConfigOverrideCategorySoldBy: QueryConfigType = useMemo(
		() => ({ page: "1", limit: "20", category: productItemCategoryId, sort_by: "sold" }),
		[productItemCategoryId],
	);

	const { data: similarProductListQueryData } = useGetProductListQuery(queryConfigOverrideCategory);

	// Query quản lý chức năng getItems cùng CategoryId, sold_by = sold (bán chạy)
	const { data: similarSoldByProductListQueryData } = useGetProductListQuery(queryConfigOverrideCategorySoldBy);

	// quản lý số lượng mua tại component này, thông qua state buyCount
	const [numberOfProducts, setNumberOfProducts] = useState<number>(1);
	const handleSetNumberOfProducts: (value: number) => void = (value: number) => {
		setNumberOfProducts(value);
	};

	// Method quản lý chức năng thêm sản phẩm vào giỏ hàng:
	const handleAddToCart = async () => {
		await addProductItemToCartMutation({
			product_id: productItemDetailQueryData?.data._id as string,
			buy_count: numberOfProducts,
		})
			.unwrap()
			.then((addToCartSuccessResponse) => {
				toast(addToCartSuccessResponse.message, { autoClose: 3000 });
			})
			.catch(() => {
				console.log("error add product item");
			});
	};

	// Method handle chức năng Mua Ngay
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
		// -> tại Route cart nhận state thông qua location = useLocation()
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
						// số lượng sản phẩm
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
