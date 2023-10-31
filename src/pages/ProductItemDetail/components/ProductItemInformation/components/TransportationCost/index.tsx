// icons:
import { FreeShipIcon } from "src/icons";

interface TransportationCostPropsType {
	protectionTitle: string;
	shippingTitle: string;
	freeShippingTitle: string;
}

export default function TransportationCost({
	freeShippingTitle,
	shippingTitle,
	protectionTitle,
}: TransportationCostPropsType) {
	return (
		<div className='flex flex-col text-sm text-[#757575] mb-8'>
			<div className='flex items-center justify-start mb-4'>
				<span className='min-w-[110px] capitalize'>{protectionTitle}</span>
				<span className='flex-1 text-[#222222] capitalize'>bảo hiểm thời trang mới</span>
			</div>
			<div className='flex items-center justify-start'>
				<span className='min-w-[110px] capitalize'>{shippingTitle}</span>
				<span className='flex items-center justify-start flex-1'>
					<FreeShipIcon />
					<span className='text-[#222222] bg-gray-300 rounded-sm ml-2 capitalize'>{freeShippingTitle}</span>
				</span>
			</div>
		</div>
	);
}
