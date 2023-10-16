// react hooks:
import { memo } from "react";
// i18n
import { useTranslation } from "react-i18next";
// constants:
import { paths } from "src/constants";
// icons:
import { PurchasesIcon } from "src/icons";
// common components:
import { Button } from "src/components";

export default memo(function PurchaseList() {
	const { purchases: purchasesPathUrl } = paths;
	const { t } = useTranslation("user");
	return (
		<div>
			<Button to={purchasesPathUrl}>
				<div className='flex capitalize items-center mb-4 cursor-pointer hover:text-[#ee4d2d]'>
					<PurchasesIcon className='mr-3' />
					<p>{t("asideNavbar.my purchase")}</p>
				</div>
			</Button>
		</div>
	);
});
