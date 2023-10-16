interface UploadAvatarPropsType {
	userAvatarFromForm?: string;
	previewAvatar: string;
	onSetUserAvatar?: (fileFromLocal: File) => void;
}
export default UploadAvatarPropsType;
