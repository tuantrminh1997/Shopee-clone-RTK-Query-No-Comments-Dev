// react hooks:
import { memo } from "react";
// format currency:
import { formatCurrency } from "src/utils";
import { ProductItemPricesPropsType } from "src/types";

export default memo(function OldPriceNewPrice({
	productItemOldPrice,
	productItemNewPrice,
}: ProductItemPricesPropsType) {
	return (
		<div className='flex justify-start items-start text-[#ee4d2e] text-xl basis-[50%]'>
			<div className='flex items-start text-[#929292] font-thin text-[22px] line-through mr-3'>
				<span className='underline text-[11px] mr-1 leading-[25px]'>đ</span>
				<span className='text-[20px] mr-1 leading-7'>{formatCurrency(productItemOldPrice as number) as string}</span>
			</div>
			<div className='flex items-start'>
				<span className='underline text-[15px] mr-1 leading-[25px]'>đ</span>
				<span>{formatCurrency(productItemNewPrice as number) as string}</span>
			</div>
		</div>
	);
});
