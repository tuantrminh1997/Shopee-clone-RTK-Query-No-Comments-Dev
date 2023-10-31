// react hooks:
import { memo } from "react";
// utils:
import { getUserAvatarUrl } from "src/utils";
// types:
import { PreviewAvatarPropsType } from "src/types";

export default memo(function PreviewAvatar({ previewAvatar, userAvatarFromForm }: PreviewAvatarPropsType) {
	return (
		<div className='w-[100px] h-[100px] my-5'>
			{/* 
          - previewAvatar = avatar người dùng upload lên local ngắm thử -> ưu tiên xem previewAvatar trước
      */}
			<img
				className='rounded-[50%]'
				src={previewAvatar || (getUserAvatarUrl(userAvatarFromForm as string) as string)}
				alt='defaultAvatar'
			/>
		</div>
	);
});
