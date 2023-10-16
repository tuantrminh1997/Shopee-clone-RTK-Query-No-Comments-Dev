// icons:
import { ShopeeShieldIcon } from "src/icons";

export default function GuaranteePolicy() {
	return (
		<div className='lowMobile:hidden flex text-sm justify-start border-t border-[rgba(0, 0, 0, 0.05)] py-6 absolute bottom-0 left-0 right-0 lg:pl-6'>
			<div className='flex'>
				<span>
					<ShopeeShieldIcon />
				</span>
				<span className='text-[#222222] ml-2'>Shopee đảm bảo</span>
			</div>
			<span className='text-[#0000008A] ml-4'>3 Ngày Trả Hàng/ Hoàn Tiền</span>
		</div>
	);
}
