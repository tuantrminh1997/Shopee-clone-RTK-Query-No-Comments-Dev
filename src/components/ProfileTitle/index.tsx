// react hooks
import { memo } from "react";
// i18n
import { useTranslation } from "react-i18next";

export default memo(function ProfileTitle() {
	const { t } = useTranslation("user");
	return (
		<div className='py-[18px] border-b border-[#efefef]'>
			<p className='text-lg text-[#333333 font-medium capitalize'>{t("topTitle.my profile")}</p>
			<p className='text-sm text-[#555555] mt-[3px]'>{t("topTitle.manage and protect your account")}</p>
		</div>
	);
});
