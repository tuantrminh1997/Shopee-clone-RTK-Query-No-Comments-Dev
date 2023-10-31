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
	// Chú ý: 2 flow phổ biến khi upload ảnh:
	// Flow 1: khi nhận upload ảnh -> upload thẳng lên server -> server trả về url ảnh
	//        Nhấn Submit -> gửi url ảnh kèm theo data lên server.
	// Ưu điểm của flow 1: khi nhấn upload ảnh thì có hiệu quả ngay lập tức (nhanh hơn flow 2 1 chút)
	// Nhược điểm của flow 1: do user upload thẳng ảnh lên server được trong khi chưa nhấn lưu (submit) -> dễ gây ra tình trạng spam và để lại rác trên server.

	// Flow 2: khi nhận upload ảnh -> chưa upload thẳng lên server, mới chỉ ở local
	//        Nhấn Submit và thành công -> upload thẳng lên server và tiến hành gọi API updateUserProfileMutateAsync
	//        ->  server trả về success data là có chứa tên bức ảnh (đã được mã hoá)
	// Ưu điểm của flow 2: dù chậm hơn flow 1 1 chút nhưng các thao tác được thực hiện tuần tự, người dùng upload ảnh lên preview mới chỉ ở local, nếu muốn đổi ảnh có thể đổi thoải mái
	//                    vì vẫn chỉ ở local, sau khi thật sự ưng ảnh nào thì mới nhấn submit và đẩy lên server (tránh được cả tình trạng spam và rác trên server).
	// Nhược điểm của flow 2: khi upload lên local xong, nhấn submit -> 2 api được thực thi theo tuần tự: updateUserAvatarApi sau đó submit

	// -> quyết định chọn flow 2, các bước chính:
	// 1. Khai báo mutation quản lý tác vụ call API để update user avatar
	// ref for Input type = file
	const { t } = useTranslation("user");
	return (
		<div className='flex flex-col items-center basis-[30%] border-l border-[#efefef] xl:row-start-1 xl:mb-9 xl:border-none'>
			<PreviewAvatar previewAvatar={previewAvatar} userAvatarFromForm={userAvatarFromForm} />
			{/* 
        - Thẻ input type = file được hidden khỏi DOM
        -> sử dụng useRef để khi focus vào button chọn ảnh -> focus vào input type = "file"
      */}

			{/* <button
				className='border border-[rgba(0,0,0,.09)] text-sm text-[#555555] px-5 rounded-sm py-[9px] profileUploadAvatarButtonBoxShadow'
				type='button'
				// Sự kiện click được kích hoạt -> gọi tới ref fileInputRef.current và click ()
				onClick={handleFocusUploadUserAvatarButton}
			>
				Chọn Ảnh
			</button>
			<input
				type='file'
				className='hidden'
				ref={inputTypeFileReference}
				// Chú ý: handleSelectFile được kích hoạt tại sự kiện onChange, tức là phải thật sự chọn 2 file ảnh khác nhau hoàn toàn ở 2 thời điểm liền kề nhau thì hàm handleSelectFile
				// mới được sự kiện onChange kích hoạt, nếu không sẽ không kích hoạt method handleSelectFile.
				// -> cách fix để có thể chọn cùng 1 file ảnh ở 2 thời điểm liền kề nhau là thêm onClick => set ngược lại event.target.value = null, không vấn đề gì vì ở đây ta sử dụng
				// event.target.files.
				onChange={(event) => handleSelectFile(event)}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				onClick={(event) => ((event.target as any).value = null)}
			/> */}
			<InputFileSelection selectTitle={t("userAvatar.select image")} onChange={onSetUserAvatar} />
			<PreviewAvatarDescription />
		</div>
	);
});
