// imports:
// rect hook:
import { useRef, memo } from "react";
// types
import { InputFileSelectionPropsType } from "src/types";

export default memo(function InputFileSelection({ selectTitle, onChange }: InputFileSelectionPropsType) {
	const inputTypeFileReference = useRef<HTMLInputElement>(null);

	const handleFocusUploadUserAvatarButton = () => {
		inputTypeFileReference.current?.click();
	};

	const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const fileFromLocal = event.target.files?.[0];
		onChange && fileFromLocal && onChange(fileFromLocal);
	};
	return (
		<>
			<button
				className='capitalize border border-[rgba(0,0,0,.09)] text-sm text-[#555555] px-5 rounded-sm py-[9px] profileUploadAvatarButtonBoxShadow'
				type='button'
				onClick={handleFocusUploadUserAvatarButton}
			>
				{selectTitle}
			</button>
			<input
				type='file'
				className='hidden'
				ref={inputTypeFileReference}
				onChange={(event) => handleSelectFile(event)}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				onClick={(event) => ((event.target as any).value = null)}
			/>
		</>
	);
});
