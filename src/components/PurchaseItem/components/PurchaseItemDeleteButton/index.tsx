import { PurchaseItemDeleteButtonPropsType } from "src/types";

export default function PurchaseItemDeleteButton({
	handleDeletePurchaseItem,
	extendPurchaseItemIndex,
	deleteActionTitle,
}: PurchaseItemDeleteButtonPropsType) {
	return (
		<div className='h-full basis-[20%] flex items-center justify-center'>
			<button
				className='capitalize bg-none border-none outline-none text-sm text-[#000000DE] hover:text-[#ee4d2d]'
				onClick={handleDeletePurchaseItem && handleDeletePurchaseItem(extendPurchaseItemIndex as number)}
			>
				{deleteActionTitle}
			</button>
		</div>
	);
}
