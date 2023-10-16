// i18n
import { useTranslation } from "react-i18next";
// icons
import { FreeShipIcon } from "src/icons";

export default function ShippingDiscount() {
	const { t } = useTranslation("cart");
	return (
		<div className='basis-[20%] border-b border-[rgba(0,0,0,.09)]'>
			<div className='flex justify-start items-center flex-1 text-sm text-[#000000CC] h-[55px]'>
				<div className='flex w-[58px] h-full pl-3'>
					<FreeShipIcon className='m-auto' />
				</div>
				<div className='flex justify-between items-center'>
					<span className='flex md:flex-col text-sm text-[#000000CC] pl-5 lowMobile:text-[11px] lowerMobile:text-[9px]'>
						<p>{t("cartItem.₫15.000 off shipping on orders from ₫50.000;")}</p>
						<p>{t("cartItem.₫25.000 off shipping on orders from ₫150.000")}</p>
					</span>
				</div>
			</div>
		</div>
	);
}
