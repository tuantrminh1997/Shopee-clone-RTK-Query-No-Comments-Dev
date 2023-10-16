// react hooks:
import { memo } from "react";
// i18n
import { useTranslation } from "react-i18next";
// constants:
import { paths } from "src/constants";
// icons:
import { EditProfileIcon } from "src/icons";
// types:
import { AvatarNamePropsType } from "src/types";
// common components:
import { Button } from "src/components";
// utils:
import { getUserAvatarUrl } from "src/utils";

export default memo(function AvatarName({ userProfile }: AvatarNamePropsType) {
	const { profile: profilePathUrl } = paths;
	const { t } = useTranslation("user");
	return (
		<div className='flex py-4 border-b border-[#efefef]'>
			<Button className={"w-[50px] h-[50px] shrink-0 relative"} childrenClassName={"absolute top-0 left-0"} to={profilePathUrl}>
				<img className='rounded-[50%] w-7 h-7' src={getUserAvatarUrl(userProfile?.avatar as string)} alt='userAvatar' />
			</Button>
			<div className='text-sm'>
				<p className=' text-[#333333] font-semibold'>{userProfile?.name}</p>
				<Button className='text-[#888888] ' childrenClassName={"flex items-center overflow-hidden"} to={profilePathUrl}>
					<EditProfileIcon className='mr-1' />
					<p className='capitalize'>{t("asideNavbar.edit profile")}</p>
				</Button>
			</div>
		</div>
	);
});
