import { forwardRef, useState } from "react";
import { InputNumberPropsType } from "src/types";
import { FieldValues } from "react-hook-form";

const InputSecondVersion = forwardRef<HTMLInputElement, InputNumberPropsType<FieldValues>>(function InputNumberInner(
	{
		// Chú ý: với className nếu set giá trị default, khi truyền prop thì className default sẽ bị ghi đè toàn bộ
		classNameContainer, // ?
		// className cho ther input
		classNameInput, // ?
		// className cho thẻ div error
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

	// Method handle việc nhập ký tự text -> không ăn, yêu cầu cần nhập chữ số
	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (/^\d+$/.test(value) || value === "") {
			// Nếu có truyền onChange -> truyền event cho onChange và thực thi hàm onChange từ bên ngoài
			onChange && onChange(event);
			// cập nhật lại localValueState -> vì value không truyền từ ngoài vào -> value tại thẻ input = localValueState
			setLocalValueState(value);
		}
	};

	return (
		<div className={classNameContainer}>
			<input
				type={type}
				// className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
				className={classNameInput}
				placeholder={placeholder}
				autoComplete={autoComplete}
				onChange={handleChangeInput}
				ref={ref}
				value={value || localValueState}
				{...restProps}
			/>
			{/* Nếu không set min-h -> khi xuất hiện lỗi hoặc không -> UI bị đẩy lên đẩy xuống gây xấu. */}
			<div className={classNameError}>{errorMessage}</div>
		</div>
	);
});
export default InputSecondVersion;
