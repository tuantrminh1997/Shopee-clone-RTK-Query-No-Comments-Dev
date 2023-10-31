// currency format methods:
import { formatCurrency } from "src/utils";

interface PurchaseItemUniPricePropsType {
	extendPurchaseItemOldPrice: number;
	extendPurchaseItemPrice: number;
	isInCartPage: boolean;
}

export default function PurchaseItemUniPrice({
	extendPurchaseItemOldPrice,
	extendPurchaseItemPrice,
	isInCartPage,
}: PurchaseItemUniPricePropsType) {
	return (
		<div
			className={`h-full basis-[20%] flex items-center justify-center text-[#8888888A] ${
				isInCartPage ? "w-[150.57px]" : ""
			}`}
		>
			<span className='flex justify-start line-through mr-3'>
				<span className='text-[9px] underline mr-[2px]'>đ</span> {formatCurrency(extendPurchaseItemOldPrice as number)}
			</span>
			<span className='flex justify-start text-[#000000DE]'>
				<span className='text-[9px] underline mr-[2px]'>đ</span> {formatCurrency(extendPurchaseItemPrice as number)}
			</span>
		</div>
	);
}
