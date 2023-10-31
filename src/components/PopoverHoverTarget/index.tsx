import { PopoverHoverTargetPropsType } from "src/types";

export default function PopoverHoverTarget({ leftIcon, title, rightIcon, containerClassName, Element = "div" }: PopoverHoverTargetPropsType) {
	return (
		<Element className={containerClassName}>
			{leftIcon && <>{leftIcon}</>}
			{title}
			{rightIcon && <>{rightIcon}</>}
		</Element>
	);
}
