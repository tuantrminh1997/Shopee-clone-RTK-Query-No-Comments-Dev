// react hooks:
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface PercentDiscountPropsType {
	percentDiscount: string;
}

export default memo(function PercentDiscount({ percentDiscount }: PercentDiscountPropsType) {
	const { t } = useTranslation("productItemDetail");
	return (
		<div className='flex items-center flex-wrap ml-[15px] text-xs text-white bg-[#ee4d2d] px-1 py-[2px] rounded-sm'>
			<p className='mr-[2px]'>{percentDiscount as string}</p>
			<p>{t("productTitleArea.discount")}</p>
		</div>
	);
});
