interface ShopNamePropsType {
	isChecked?: boolean;
	handleCheck?: (purchaseItemIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
	extendPurchaseItemIndex?: number;
	productName: string;
}

export default function ShopName({ productName, isChecked, handleCheck, extendPurchaseItemIndex }: ShopNamePropsType) {
	return (
		<div className='basis-[20%] lowMobile:hidden'>
			<div className='flex justify-start items-center flex-1 text-sm text-[#000000CC] h-[55px] border-b border-[rgba(0,0,0,.09)]'>
				<div className='w-[58px] h-full flex pl-3'>
					<input
						type='checkbox'
						className='m-auto'
						checked={isChecked as boolean}
						onChange={handleCheck && handleCheck(extendPurchaseItemIndex as number)}
					/>
				</div>
				<div className='flex items-center'>
					<p className='text-sm text-[#000000DE] mx-2'>{productName}</p>
				</div>
			</div>
		</div>
	);
}
