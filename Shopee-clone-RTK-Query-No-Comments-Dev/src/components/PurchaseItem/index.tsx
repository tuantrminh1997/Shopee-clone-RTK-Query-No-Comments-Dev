// constants:
import { paths } from "src/constants";
// react router dom:
import { useLocation } from "react-router-dom";
// i18n
import { useTranslation } from "react-i18next";
// types
import { PurchaseItemPropsType } from "src/types";
// currency format methods:
import { formatCurrency } from "src/utils";
// private components:
import {
	PurchaseItemTotalPrice,
	PurchaseItemDeleteButton,
	ShippingDiscount,
	PurchaseItemUniPrice,
	PurchaseItemOverview,
	CheckItem,
	ShopName,
} from "./components";
// common components:
import { ProductItemQuantityController } from "src/components";

export default function PurchaseItem({
	extendPurchaseItem,
	extendPurchaseItemIndex,
	handleCheck,
	handleUpdateQuantityPurchaseItem,
	handleTypeQuantity,
	// purchaseItem = purchase Nguyên bản
	handleDeletePurchaseItem,
	purchaseItemBuyCount,
	itemNameId,
}: PurchaseItemPropsType) {
	// method quản lý chức năng tính ra tổng số tiền từng sản phẩm
	const getProductTotalPrice: () => string = () => {
		return formatCurrency((extendPurchaseItem?.buy_count as number) * (extendPurchaseItem?.product.price as number)) as string;
	};
	const isInCartPage: boolean = paths.cart === useLocation().pathname;
	const isInPurchasePage: boolean = paths.purchases === useLocation().pathname;
	const { t } = useTranslation("cart");
	return (
		<div className={`flex flex-col justify-between rounded-md bg-white ${isInPurchasePage ? "pl-2 py-2" : "mb-3 lg:mx-3"}`}>
			{/*  Vùng 1: Checkbox + kho sỉ Hoàng Ngân */}
			{isInCartPage && (
				<ShopName
					isChecked={extendPurchaseItem?.isCheck as boolean}
					handleCheck={handleCheck}
					extendPurchaseItemIndex={extendPurchaseItemIndex}
					productName={extendPurchaseItem?.product.name as string}
				/>
			)}
			{/* Vùng 2: chứa thông tin chính của sản phẩm, QuantityController, Price, Delete Button */}
			<div className='flex py-1 basis-[60%] w-full border-b border-[rgba(0,0,0,.09)] lg:grid lg:grid-cols-1 lg:grid-rows-2'>
				{/* Checkbox + Ảnh + Tên sản phẩm */}
				<div className='flex justify-start items-center flex-1 text-sm text-[#000000CC] h-full'>
					{isInCartPage && (
						<CheckItem
							isChecked={extendPurchaseItem?.isCheck as boolean}
							handleCheck={handleCheck && (handleCheck as (purchaseItemIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void)}
							extendPurchaseItemIndex={extendPurchaseItemIndex}
						/>
					)}
					{/* Ảnh + Tên sản phẩm */}
					<PurchaseItemOverview
						extendPurchaseItemImageSrc={extendPurchaseItem?.product.image as string}
						extendPurchaseItemName={extendPurchaseItem?.product.name as string}
						extendPurchaseItemProductId={extendPurchaseItem?.product._id as string}
					/>
				</div>
				{/* Vùng Đơn giá + QuantityController + SỐ tiền + Button xoá  */}
				<div className='flex flex-1 justify-around text-sm lg:grid lg:grid-cols1 lg:grid-rows-4 sm:grid-rows-5 lg:justify-start sm:mt-2'>
					{/* Tên sản phẩm: */}
					<div className='hidden sm:ml-6 sm:flex sm:items-center '>
						<p className='lg:block lg:min-w-[40%] capitalize'>{t("cartTitlte.product name")}:</p>
						<p className='sm:text-xs'>{extendPurchaseItem?.product.name as string}</p>
					</div>
					{/* Đơn giá */}
					<div className='basis-[26%] lg:ml-6 lg:flex lg:items-center'>
						<p className='hidden lg:block lg:min-w-[40%] capitalize'>{t("cartTitlte.unit price")}:</p>
						<PurchaseItemUniPrice
							extendPurchaseItemOldPrice={extendPurchaseItem?.product.price_before_discount as number}
							extendPurchaseItemPrice={extendPurchaseItem?.product.price as number}
							isInCartPage={isInCartPage as boolean}
						/>
					</div>
					{/* Quantity controller */}
					<div className='basis-[25%] lg:ml-6 lg:flex lg:items-center'>
						<p className='hidden lg:block lg:min-w-[40%] capitalize'>{t("cartTitlte.quantity")}:</p>
						<div className='h-full basis-[20%] flex items-center justify-center'>
							{/* Component quản lý quantity */}
							{isInCartPage && (
								<ProductItemQuantityController
									itemNameId={itemNameId as string | undefined}
									maxQuantityAvailable={extendPurchaseItem?.product.quantity as number}
									classNameContainer='m-auto'
									classNameInnerDiv='mr-0'
									value={extendPurchaseItem?.buy_count as number}
									onIncreaseQuantity={
										handleUpdateQuantityPurchaseItem &&
										((buyCountValue) =>
											handleUpdateQuantityPurchaseItem(
												extendPurchaseItemIndex as number,
												buyCountValue,
												// giá trị của đối số enable
												buyCountValue <= (extendPurchaseItem?.product.quantity as number),
											))
									}
									onDecreaseQuantity={
										handleUpdateQuantityPurchaseItem &&
										((buyCountValue) =>
											// đối số thứ 3 = giá trị của enable
											handleUpdateQuantityPurchaseItem(extendPurchaseItemIndex as number, buyCountValue, buyCountValue >= 1))
									}
									//
									disabled={extendPurchaseItem?.disabled as boolean}
									onTypeQuantity={
										handleTypeQuantity &&
										(handleTypeQuantity(extendPurchaseItemIndex as number) as (purchaseItemIndex: number) => (value: number) => void)
									}
									onFocusOut={
										handleUpdateQuantityPurchaseItem &&
										((buyCountValue) => {
											// buyCountValue = giá trị buyCount nhập tay vào Component QuantityController và xuất ra ngoài
											return handleUpdateQuantityPurchaseItem(
												extendPurchaseItemIndex as number,
												buyCountValue,
												// giá trị của đối số enable
												buyCountValue >= 1 &&
													buyCountValue <= (extendPurchaseItem?.product.quantity as number) &&
													buyCountValue !== purchaseItemBuyCount,
											);
										})
									}
								/>
							)}
							{isInPurchasePage && <div>{extendPurchaseItem?.buy_count as number}</div>}
						</div>
					</div>
					{/* Tổng giá sản phẩm */}
					<div className='basis-[25%] lg:ml-6 lg:flex lg:items-center'>
						<p className='hidden lg:block lg:min-w-[40%] capitalize'>{t("cartTitlte.total price")}:</p>
						<PurchaseItemTotalPrice getProductTotalPrice={getProductTotalPrice() as string} />
					</div>
					{/* Button xoá */}
					{isInCartPage && (
						<div className='basis-[24%] lg:ml-6 lg:flex lg:items-center'>
							<p className='hidden lg:block lg:min-w-[40%] capitalize'>{t("cartTitlte.actions")}:</p>
							<PurchaseItemDeleteButton
								handleDeletePurchaseItem={handleDeletePurchaseItem && (handleDeletePurchaseItem as (purchaseItemIndex: number) => () => void)}
								extendPurchaseItemIndex={extendPurchaseItemIndex as number}
								deleteActionTitle={t("cartItem.delete")}
							/>
						</div>
					)}
				</div>
			</div>
			{/* Vùng 3: vùng thông tin giảm chi phí vận chuyển  */}
			{isInCartPage && <ShippingDiscount />}
		</div>
	);
}
