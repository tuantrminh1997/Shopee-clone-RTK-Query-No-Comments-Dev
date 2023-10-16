// types
import { ProductItemTitlePropsTypes } from "src/types";
// format currency:
import { formatNumberToSocialStyle } from "src/utils";
// components
import { StarRating } from "src/components";

export default function ProductItemTitle({
	productItemName,
	productItemRating,
	productItemSold,
	productItemView,
	viewTitle,
	soldTitle,
}: ProductItemTitlePropsTypes) {
	return (
		<div className='flex flex-col max-w-[600px] lg:min-w-full'>
			<span className='text-xl text-[#000000CC] uppercase py-3 lg:text-left lg:text-2xl'>{productItemName}</span>
			<div className='flex mb-3 lg:min-w-full lg:justify-start lowerMobile:justify-between'>
				<div className='flex items-center border-r border-[rgba(0, 0, 0, 0.14)] text-base mr-2 pr-2 text-[#ee4d2d]'>
					<span className='mr-[4px] underline'>{productItemRating}</span>
					<StarRating isAtProductDetailPage rating={productItemRating} />
				</div>
				<div className='flex items-center justify-start border-r border-[rgba(0, 0, 0, 0.14)] mr-2 pr-2 lowerMobile:pr-0'>
					<span className='text-[#222222] underline'>{formatNumberToSocialStyle(productItemView)}</span>
					<span className='text-sm ml-1 text-[#767676] capitalize'>{viewTitle}</span>
				</div>
				<div className='flex items-center justify-start mr-2 pr-2 lowerMobile:pr-0'>
					<span className='text-[#222222]'>{formatNumberToSocialStyle(productItemSold)}</span>
					<span className='text-sm ml-1 text-[#767676] capitalize'>{soldTitle}</span>
				</div>
			</div>
		</div>
	);
}
