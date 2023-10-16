// i18n
import { useTranslation } from "react-i18next";
// types
import { TitleAreaPropsType } from "src/types";

export default function TitleArea({ isCheckFull, handleCheckFull }: TitleAreaPropsType) {
	const { t } = useTranslation("cart");
	return (
		<div className='lg:hidden'>
			<div className='flex rounded-md bg-white cartPageBoxShadow1 h-[55px] mb-3'>
				<div className='inline-flex justify-start items-center flex-1 text-sm text-[#000000CC]'>
					<div className='w-[58px] h-full flex pl-3'>
						<input type='checkbox' className='m-auto' checked={isCheckFull} onChange={handleCheckFull} />
					</div>
					<span className='pl-5 capitalize'>{t("cartTitlte.product")}</span>
				</div>
				<div className='flex flex-1 justify-around text-sm text-[#888888]'>
					<span className='h-full flex justify-center items-center basis-[26%] capitalize'>{t("cartTitlte.unit price")}</span>
					<span className='h-full flex justify-center items-center basis-[25%] capitalize'>{t("cartTitlte.quantity")}</span>
					<span className='h-full flex justify-center items-center basis-[25%] capitalize'>{t("cartTitlte.total price")}</span>
					<span className='h-full flex justify-center items-center basis-[24%] capitalize'>{t("cartTitlte.actions")}</span>
				</div>
			</div>
		</div>
	);
}
