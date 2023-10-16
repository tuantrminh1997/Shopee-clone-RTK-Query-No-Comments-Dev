// react router dom:
import { NavLink } from "react-router-dom";
// react hooks:
import { memo } from "react";
// classnames:
import classNames from "classnames";
// i18n
import { useTranslation } from "react-i18next";
// types:
import { MyAccountSideNavbarConstantsType, MyAccountPropsTypes } from "src/types";
// constants:
import { paths } from "src/constants";
// icons:
import { MyAccountIcon } from "src/icons";
// common components:
import { Button } from "src/components";

export default memo(function MyAccount({ isOpenMyAccountNavbar }: MyAccountPropsTypes) {
	const { profile: profilePathUrl } = paths;
	const { t } = useTranslation("user");

	const myAccountSideNavbarConstants: MyAccountSideNavbarConstantsType = [
		{
			route: paths.profile,
			textNode: t("asideNavbar.profile"),
		},
		{
			route: paths.changePassword,
			textNode: t("asideNavbar.change password"),
		},
	];
	return (
		<div>
			<Button to={profilePathUrl}>
				<div className='flex capitalize items-center mb-4 cursor-pointer hover:text-[#ee4d2d]'>
					<MyAccountIcon className='mr-3' />
					<NavLink to={profilePathUrl}>{t("asideNavbar.my account")}</NavLink>
				</div>
			</Button>
			<div
				className={`flex flex-col items-start justify-between pl-9 pb-1 myAccountNavbarTransition ${
					isOpenMyAccountNavbar ? "myAccountNavbarActive" : "myAccountNavbarHide"
				}`}
			>
				{myAccountSideNavbarConstants.map((myAccountSideNavbarConstant, index) => {
					const { textNode, route } = myAccountSideNavbarConstant;
					return (
						<NavLink
							to={route}
							key={index}
							className={({ isActive }) =>
								classNames("mb-4 text-sm capitalize", {
									"text-[#ee4d2d]": isActive,
									"text-[#000000A6] hover:text-[#ee4d2d] ": !isActive,
								})
							}
						>
							{textNode}
						</NavLink>
					);
				})}
			</div>
		</div>
	);
});
