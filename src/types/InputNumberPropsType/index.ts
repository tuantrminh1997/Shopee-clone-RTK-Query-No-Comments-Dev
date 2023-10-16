import { InputHTMLAttributes } from "react";
import { FieldPath, FieldValues, UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputNumberPropsType<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
	type?: React.HTMLInputTypeAttribute;
	errorMessage?: string;
	placeholder?: string;
	classNameContainer?: string;
	classNameInput?: string; // ?
	classNameError?: string; // ?
	formPropertyName?: FieldPath<TFieldValues>;
	/**
	 * Chú ý: Để hiểu rõ cơ chế hoạt động của useForm() và register trong React-Hook-form, cần nằm rõ (Đọc trong file .md 7)
	 * Lần ra type của function register trong thư viện react-hook-form (xem tại .md 7.1)
	 */
	register?: UseFormRegister<TFieldValues>;
	formPropertyRules?: RegisterOptions;
	autoComplete?: string;
	onChange?: React.FormEventHandler<HTMLDivElement>;
	value?: string | number;
	ContainerElement?: React.ElementType;
	ErrorContainerElement?: React.ElementType;
	handleToggleShowPassword?: (openEyeIconMode: boolean) => void;
	pathname?: string;
}
export default InputNumberPropsType;
