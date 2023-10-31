/* eslint-disable react-hooks/exhaustive-deps */
// react hook form:
import { useFormContext } from "react-hook-form";
// react hooks:
import { useMemo, memo } from "react";
// types
import { SubmitFormButtonPropsType } from "src/types";
// common components
import { Button } from "src/components";

export default memo(function SubmitFormButton({
	userProfileQueryLoading,
	updateUserProfileLoading,
	updateUserAvatarLoading,
	changeUserPasswordLoading,
	submitFormButtonTitle,
}: SubmitFormButtonPropsType) {
	const {
		formState: { errors: formErrors },
	} = useFormContext();

	const hasErrorsInForm: boolean = useMemo(() => Object.keys(formErrors).length > 0, [Object.keys(formErrors).length]);
	const isDisableSubmitFormButton = useMemo(
		() =>
			Object.keys(formErrors).length > 0 ||
			userProfileQueryLoading ||
			updateUserProfileLoading ||
			updateUserAvatarLoading ||
			changeUserPasswordLoading,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[hasErrorsInForm, userProfileQueryLoading, updateUserProfileLoading, updateUserAvatarLoading, changeUserPasswordLoading],
	);
	return (
		<div className='flex'>
			<div className='flex items-center justify-end basis-[33.33%] pb-[30px] xl:hidden'></div>
			<div className='flex justify-left basis-[66.66%] pl-[20px] pb-[30px] xl:pl-0 xl:m-auto'>
				<Button
					className={`text-sm text-white px-5 py-[10px] rounded-sm  ${
						isDisableSubmitFormButton ? "bg-[#facac0]" : "bg-[#ee4d2d] hover:bg-[#f05d40]"
					} xl:m-auto capitalize`}
					childrenClassName={"m-auto"}
					disabled={isDisableSubmitFormButton}
				>
					{submitFormButtonTitle}
				</Button>
			</div>
		</div>
	);
});
