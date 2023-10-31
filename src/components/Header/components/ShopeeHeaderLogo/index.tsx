// imports:
// i18n
import { useTranslation } from "react-i18next";
// constants:
import { paths } from "src/constants";
// common components:
import { PopoverOption } from "src/components";
// icons:
import { ShopeeLogo } from "src/icons";

interface ShopeeHeaderLogoPropsType {
	isHeaderForCartLayout?: boolean;
}

export default function ShopeeHeaderLogo({ isHeaderForCartLayout }: ShopeeHeaderLogoPropsType) {
	const { t } = useTranslation("header");
	return (
		<PopoverOption
			to={paths.productList}
			containerClassName={`${
				!isHeaderForCartLayout ? "max-w-[202px] max-h-[59px] pr-[40px] lowMobile:hidden" : "min-w-[283.5px] h-[46px]"
			} `}
			innerClassName={"p-[2px] m-[2px] rounded-[2px]"}
			InnerElement='div'
			title={
				isHeaderForCartLayout ? (
					<div className='w-full h-full flex items-end justify-start xl:w-[280px]'>
						<ShopeeLogo fill='#ee4d2d' width='168' height='50' />
						<span className='text-xl text-[#ee4d2d] ml-2 border-l border-[#ee4d2d] pl-[15px]'>
							{t("headercartLayout.cart")}
						</span>
					</div>
				) : (
					<ShopeeLogo fill='white' width='168' height='50' />
				)
			}
		/>
	);
}
