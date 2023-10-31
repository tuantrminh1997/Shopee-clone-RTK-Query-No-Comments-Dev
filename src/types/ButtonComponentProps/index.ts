import { ButtonHTMLAttributes } from "react";
import { To } from "react-router-dom";

interface ButtonComponentProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
	className?: string;
	isLoading?: boolean;
	childrenClassName?: string;
	buttonBg?: string;
	ContainerElement?: React.ElementType;
	to?: To;
	href?: string;
	Element?: React.ElementType;
	newClassName?: string;
	isNavLink?: boolean;
}
export default ButtonComponentProps;
