interface CheckItemPropsType {
	isChecked?: boolean;
	handleCheck?: (purchaseItemIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
	extendPurchaseItemIndex?: number;
}

export default function CheckItem({ isChecked, handleCheck, extendPurchaseItemIndex }: CheckItemPropsType) {
	return (
		<div className='min-w-[58px] h-full flex pl-3'>
			<input
				type='checkbox'
				className='m-auto'
				checked={isChecked as boolean}
				onChange={handleCheck && handleCheck(extendPurchaseItemIndex as number)}
			/>
		</div>
	);
}
