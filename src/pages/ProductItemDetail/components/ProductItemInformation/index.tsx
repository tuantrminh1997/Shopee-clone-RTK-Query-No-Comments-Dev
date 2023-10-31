// types:
import { ProductItemInformationPropsType } from "src/types";
// i18
import { useTranslation } from "react-i18next";
// common components:
import { ProductItemQuantityController } from "src/components";
// private components:
import { ProductItemTitle, ProductItemPrices, TransportationCost, ShopingButtons, GuaranteePolicy } from "./components";

export default function ProductItemInformation({
	productItemDetailData,
	handleAddToCart,
	handleSetNumberOfProducts,
	numberOfProducts,
	handleBuyNow,
	itemNameId,
}: ProductItemInformationPropsType) {
	const { t } = useTranslation("productItemDetail");
	return (
		<div className='flex flex-col basis-[55%] relative lg:px-6 lg:min-h-[500px] lg:w-full'>
			{/* Tên sản phẩm */}
			<ProductItemTitle
				productItemName={productItemDetailData.name}
				productItemRating={productItemDetailData.rating}
				productItemView={productItemDetailData.view}
				productItemSold={productItemDetailData.sold}
				viewTitle={t("productTitleArea.views")}
				soldTitle={t("productTitleArea.sold")}
			/>
			{/* Vùng giá cũ - giá mới */}
			<ProductItemPrices
				productItemOldPrice={productItemDetailData.price_before_discount}
				productItemNewPrice={productItemDetailData.price}
			/>
			{/* Vùng deal sốc, bảo hiểm, vận chuyển: chưa thấy API hỗ trợ */}
			<TransportationCost
				protectionTitle={t("productInformations.protection")}
				shippingTitle={t("productInformations.shipping")}
				freeShippingTitle={t("productInformations.free shipping")}
			/>
			{/* Vùng số lượng, tăng/giảm số lượng sản phẩm */}
			<ProductItemQuantityController
				// Truyền các props đại diện cho 3 sự kiện: tăng số lượng, giảm số lượng, nhập tay số lượng
				// truyền state quản lý số lượng sản phẩm:
				onIncreaseQuantity={handleSetNumberOfProducts as (value: number) => void}
				onDecreaseQuantity={handleSetNumberOfProducts as (value: number) => void}
				onTypeQuantity={handleSetNumberOfProducts as (value: number) => void}
				value={numberOfProducts as number}
				maxQuantityAvailable={productItemDetailData.quantity as number}
				itemNameId={itemNameId as string}
				piecesAvailableTitlte={t("productInformations.pieces available") as string}
				quantityControllerTitle={t("productInformations.quantity") as string}
			/>
			{/* <ProductItemQuantityController
				maxQuantityAvailable={productItemDetailData.quantity}
				// Ta tiến hành tối ưu hoá component này theo hướng fix vấn đề sau:
				// trong trường hợp cố tình không truyền khối Props cồng kềnh như trên: -> nhập tay giá trị được nhưng tăng/giảm giá trị quantity không hoạt đỘng
				// -> Ta muốn Logic vẫn hoạt động đúng.
				// Tiến hành tối ưu:
				// 1. tạo 1 localState cho component (useState)
			/> */}
			{/* Vùng Button: Thêm vào giỏ hàng, mua ngay */}
			<ShopingButtons
				handleAddToCart={handleAddToCart as () => void}
				handleBuyNow={handleBuyNow as () => Promise<void>}
				addToCartTitle={t("productInformations.add to cart")}
				buyNowTitle={t("productInformations.buy now")}
			/>
			{/* Vùng shopee đảm bảo,  */}
			<GuaranteePolicy />
		</div>
	);
}
