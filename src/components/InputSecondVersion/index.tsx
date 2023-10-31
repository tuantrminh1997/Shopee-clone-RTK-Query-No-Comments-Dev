import { forwardRef, useState } from "react";
import { InputNumberPropsType } from "src/types";
import { FieldValues } from "react-hook-form";

const InputSecondVersion = forwardRef<HTMLInputElement, InputNumberPropsType<FieldValues>>(function InputNumberInner(
	{
		classNameContainer, // ?
		classNameInput, // ?
		classNameError, // ?
		type, // ?
		errorMessage, // ?
		placeholder, // ?
		autoComplete, // ?
		onChange, // ?
		// ref,
		value = "",
		...restProps
	},
	ref,
) {
	const [localValueState, setLocalValueState] = useState<string | number>(value);

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (/^\d+$/.test(value) || value === "") {
			onChange && onChange(event);
			setLocalValueState(value);
		}
	};

	return (
		<div className={classNameContainer}>
			<input
				type={type}
				className={classNameInput}
				placeholder={placeholder}
				autoComplete={autoComplete}
				onChange={handleChangeInput}
				ref={ref}
				value={value || localValueState}
				{...restProps}
			/>
			<div className={classNameError}>{errorMessage}</div>
		</div>
	);
});
export default InputSecondVersion;
