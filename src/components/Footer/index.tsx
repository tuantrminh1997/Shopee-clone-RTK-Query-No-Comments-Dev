import { useTranslation } from "react-i18next";

export default function Footer() {
	const { t } = useTranslation("footer");
	return (
		<footer className='py-16 bg-neutral-100 border-t-4 border-[#ee4d2d] lowPcMax1300px:col-span-4'>
			<div className='container'>
				<div className='grid grid-cols-3 text-sm text-[#0000008A] lg:grid-cols-1 lg:grid-rows-2'>
					<div className='col-span-1 lg:row-start-1'>
						<p className='lg:text-center'>{t("topFooter.© 2023 Shopee. All Rights Reserved.")}</p>
					</div>
					<p className='col-span-2 lg:row-start-2 lg:text-center'>
						{t("topFooter.Country & Region")}:
						{t(
							"topFooter.Singapore Indonesia Taiwan Thailand Malaysia Vietnam Philippines Brazil México Colombia Chile",
						)}
					</p>
				</div>
				<div className='text-center text-sm mt-10'>
					<p>{t("bottomContent.Shopee Company Limited")}</p>
					<p className='mt-2'>
						{t(
							"bottomContent.Floors 4-5-6, Capital Place Building, No. 29, Lieu Giai Street, Ngoc Khanh ward, Ba Dinh District, Hanoi, Vietnam",
						)}
					</p>
					<p className='mt-2'>{t("bottomContent.Person in charge of information management - Nguyen Duc Tri")}</p>
					<p className='mt-2'>{t("bottomContent.Business Registration Certificate No - 0106773786")}</p>
					<p className='mt-2'>{t("bottomContent.© 2015 - Copyright belongs to Shopee Company Limited")}</p>
				</div>
			</div>
		</footer>
	);
}
