// react
import { Fragment } from "react";
// react hook form
import { FieldPath, FieldValues } from "react-hook-form";
// constants:
import { paths } from "src/constants";
// icons:
import { EyeHideIcon, EyeShowIcon } from "src/icons";
// types:
import { ContainerPropsType, InputNumberPropsType } from "src/types";

export default function Input<TFieldValues extends FieldValues = FieldValues>({
	classNameContainer, // ?
	// className cho ther input
	classNameInput, // ?
	// className cho thẻ div error
	classNameError, // ?
	type,
	errorMessage, // ?
	placeholder, // ?
	formPropertyName,
	register, // ?
	formPropertyRules, // ?
	autoComplete, // ?
	ContainerElement,
	ErrorContainerElement,
	handleToggleShowPassword,
	pathname,
	...restProps
}: InputNumberPropsType<TFieldValues>) {
	const registerResult = register && formPropertyName ? register(formPropertyName as FieldPath<TFieldValues>, formPropertyRules) : null;

	// constants:
	const { changePassword } = paths;
	// Handle vấn đề: nếu như truyền classNameContainer -> đi vào object containerProps
	// Nếu như ContainerElement được truyền thành Fragment -> xoá các Key trong Object containerProps và ContainerElement không có Props gì -> tránh báo lỗi console.log
	const containerProps: ContainerPropsType = {};
	const errorContainerProps: ContainerPropsType = {};

	// Nếu thẻ cha chứa toàn bộ khối element và thẻ cha chứa error messa là Fragment
	// -> object containerProps và errorContainerProps là 2 object rỗng -> không truyền bất cứ props nào vào 2 element này
	// -> clear hết các props nhận vào 2 loại thẻ này -> tránh lỗi ở console
	if (ContainerElement !== Fragment) {
		containerProps.className = `${classNameContainer} relative`;
	}
	if (ErrorContainerElement !== Fragment) {
		errorContainerProps.className = classNameError;
	}
	const Container = ContainerElement || "div";
	const ErrorContainer = ErrorContainerElement || "div";
	return (
		<Container {...containerProps}>
			<input type={type} className={classNameInput} placeholder={placeholder} autoComplete={autoComplete} {...registerResult} {...restProps} />
			{pathname === changePassword && type === "password" && (
				<span
					className='absolute top-0 right-0 pr-2 cursor-pointer translate-y-[50%]'
					onClick={() => {
						handleToggleShowPassword && handleToggleShowPassword(true);
					}}
					aria-hidden='true'
				>
					<EyeHideIcon />
				</span>
			)}
			{pathname === changePassword && type === "text" && (
				<span
					className='absolute top-0 right-0 pr-2 cursor-pointer translate-y-[50%]'
					onClick={() => {
						handleToggleShowPassword && handleToggleShowPassword(false);
					}}
					aria-hidden='true'
				>
					<EyeShowIcon />
				</span>
			)}
			<ErrorContainer {...errorContainerProps}>{errorMessage}</ErrorContainer>
		</Container>
	);
}
