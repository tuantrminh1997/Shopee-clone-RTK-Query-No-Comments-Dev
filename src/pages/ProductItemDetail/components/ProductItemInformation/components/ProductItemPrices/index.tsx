// react hooks:
import { useCallback, memo } from "react";
// icons:
import { ShopeeCheapIcon } from "src/icons";
// types
import { ProductItemPricesPropsTypes } from "src/types";
// private components:
import { PriceRange, OldPriceNewPrice, PercentDiscount } from "./components";

export default memo(function ProductItemPrices({
	productItemOldPrice,
	productItemNewPrice,
}: ProductItemPricesPropsTypes) {
	const getPercentDiscount: () => string | null = useCallback(() => {
		if (productItemNewPrice < productItemOldPrice) {
			const result = (100 - (productItemNewPrice / productItemOldPrice) * 100).toFixed(0);
			return `${result}%`;
		}
		return null;
	}, [productItemNewPrice, productItemOldPrice]);
	return (
		<div className='flex flex-col bg-[#fafafaef] px-5 py-4 max-w-[600px] lowMobile:w-fit mb-8 min-h-[111px] justify-between lg:min-w-full'>
			<div className='flex items-center justify-start'>
				{/* Giá cũ - giá mới - giá trước - giá sau: */}
				{/* OldPrice > NewPrice -> giá cũ, giá mới */}
				{productItemOldPrice > productItemNewPrice && (
					<OldPriceNewPrice
						productItemOldPrice={productItemOldPrice as number}
						productItemNewPrice={productItemNewPrice as number}
					/>
				)}
				{/*OldPrice < NewPrice -> khoảng giá*/}
				{productItemOldPrice < productItemNewPrice && (
					<PriceRange
						productItemOldPrice={productItemOldPrice as number}
						productItemNewPrice={productItemNewPrice as number}
					/>
				)}
				{getPercentDiscount() && <PercentDiscount percentDiscount={getPercentDiscount() as string} />}
			</div>
			<div className='flex items-center'>
				<ShopeeCheapIcon className='mr-[8px]' />
				<div className='flex flex-col'>
					<span className='text-sm text-[#ee4d2d]'>Gì cũng rẻ</span>
					<span className='text-xs text-[#0000008A]'>Giá tốt nhất so với các sản phẩm cùng loại trên Shopee</span>
				</div>
			</div>
		</div>
	);
});
