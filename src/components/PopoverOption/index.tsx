import { Link } from "react-router-dom";
// types
import { PopoverOptionPropsType } from "src/types";

export default function PopoverOption({
	ContainerElement = "button", // ?
	InnerElement = "span", // ?
	containerClassName,
	innerClassName, // ?
	title,
	to, // ?
	href, // ?
	onclick, // ?
}: PopoverOptionPropsType) {
	const redirectOptionProps: Omit<PopoverOptionPropsType, "ContainerElement" | "InnerElement" | "containerClassName" | "innerClassName" | "title"> =
		{};

	if (to) {
		redirectOptionProps.to = to;
		ContainerElement = Link;
	} else if (href) {
		redirectOptionProps.href = href;
		ContainerElement = "a";
	}

	return (
		<ContainerElement className={containerClassName} {...redirectOptionProps} onClick={onclick}>
			<InnerElement className={innerClassName}>{title}</InnerElement>
		</ContainerElement>
	);
}
