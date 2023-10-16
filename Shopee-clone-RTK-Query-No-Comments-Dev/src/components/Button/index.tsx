// icon progressing material UI
import { Link } from "react-router-dom";
import { SpinnerFlowBite } from "src/icons";
// types:
import { ButtonComponentProps, PopoverOptionPropsType } from "src/types";

export default function Button({
	className,
	disabled,
	isLoading,
	children,
	childrenClassName,
	ContainerElement = "button",
	to,
	href,
	Element,
	...restProps
}: ButtonComponentProps) {
	const newClassName = disabled ? className + " cursor-not-allowed" : className;

	const redirectOptionProps: Omit<
		PopoverOptionPropsType,
		"ContainerElement" | "InnerElement" | "containerClassName" | "innerClassName" | "title"
	> = {};

	if (to) {
		redirectOptionProps.to = to;
		ContainerElement = Link;
	} else if (href) {
		redirectOptionProps.href = href;
		ContainerElement = "a";
	} else if (Element) {
		// handle trường hợp không truyền to, href nhưng ta muốn nó trở thành 1 thẻ span chẳng hạn
		ContainerElement = Element;
	}

	return (
		<ContainerElement className={newClassName} disabled={disabled} {...restProps} {...redirectOptionProps}>
			{isLoading && <SpinnerFlowBite />}
			<span className={childrenClassName}>{children}</span>
		</ContainerElement>
	);
}
