// react hooks:
import { memo } from "react";
// i18n
import { useTranslation } from "react-i18next";
// constants:
import { myAccountUploadUserAvatarConstants } from "src/constants";
// utils:
import { getCurrentFileSizeAsMB } from "src/utils";

export default memo(function PreviewAvatarDescription() {
	// constants:
	const { userAvatarMaxSizeAsBytes, fileExtension01, fileExtension02 } = myAccountUploadUserAvatarConstants;
	const userAvatarMaxSizeAsMB = getCurrentFileSizeAsMB(userAvatarMaxSizeAsBytes);
	const { t } = useTranslation("user");
	return (
		<div className='flex flex-col items-start mt-3 text-sm text-[#999999]'>
			<p>
				{t("userAvatar.file size")}: {t("userAvatar.maximum")} {userAvatarMaxSizeAsMB}MB
			</p>
			<p>
				{t("userAvatar.file extension")}:.${fileExtension01}, .{fileExtension02}
			</p>
		</div>
	);
});
