// react hooks:
import { memo } from "react";
// utils
import { formatCurrency } from "src/utils";
// types
import { ProductItemPricesPropsType } from "src/types";

export default memo(function PriceRange({ productItemOldPrice, productItemNewPrice }: ProductItemPricesPropsType) {
	return (
		<div className='flex justify-start items-start text-[#ee4d2e] text-3xl basis-[50%]'>
			<div className='flex items-start font-thin'>
				<span className='underline text-[15px] mr-1 leading-7'>đ</span>
				<span>{formatCurrency(productItemOldPrice)}</span>
			</div>
			<span>-</span>
			<div className='flex items-start'>
				<span className='underline text-[15px] mr-1 leading-7'>đ</span>
				<span>{formatCurrency(productItemNewPrice)}</span>
			</div>
		</div>
	);
});
