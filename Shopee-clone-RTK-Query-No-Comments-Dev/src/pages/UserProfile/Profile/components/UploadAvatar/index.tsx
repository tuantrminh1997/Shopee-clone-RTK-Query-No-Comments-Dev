// react hooks:
import { memo } from "react";
// i18n
import { useTranslation } from "react-i18next";
// types:
import { UploadAvatarPropsType } from "src/types";
// common components:
import { InputFileSelection } from "src/components";
// private components:
import { PreviewAvatarDescription, PreviewAvatar } from "./components";

export default memo(function UploadAvatar({ onSetUserAvatar, previewAvatar, userAvatarFromForm }: UploadAvatarPropsType) {
	const { t } = useTranslation("user");
	return (
		<div className='flex flex-col items-center basis-[30%] border-l border-[#efefef] xl:row-start-1 xl:mb-9 xl:border-none'>
			<PreviewAvatar previewAvatar={previewAvatar} userAvatarFromForm={userAvatarFromForm} />
			<InputFileSelection selectTitle={t("userAvatar.select image")} onChange={onSetUserAvatar} />
			<PreviewAvatarDescription />
		</div>
	);
});
