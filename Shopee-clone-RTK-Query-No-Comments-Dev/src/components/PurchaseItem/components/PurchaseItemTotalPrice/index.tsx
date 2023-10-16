interface PurchaseItemTotalPricePropsType {
	getProductTotalPrice: string;
}

export default function PurchaseItemTotalPrice({ getProductTotalPrice }: PurchaseItemTotalPricePropsType) {
	return (
		<div className='h-full basis-[20%] flex items-center justify-center'>
			<span className='text-sm text-[#ee4d2d] flex justify-start'>
				<span className='text-[9px] underline mr-[2px]'>đ</span>
				{getProductTotalPrice}
			</span>
		</div>
	);
}
