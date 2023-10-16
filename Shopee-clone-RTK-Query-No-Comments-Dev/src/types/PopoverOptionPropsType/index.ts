import { To } from "react-router-dom";
import { locales } from "src/i18n";

interface PopoverOptionPropsType {
	ContainerElement?: React.ElementType;
	InnerElement?: React.ElementType;
	containerClassName: string;
	innerClassName?: string;
	title: string | React.ReactNode;
	to?: To;
	href?: string;
	onclick?:
		| (() => (languageSelectOption: keyof typeof locales) => void)
		| React.MouseEventHandler<HTMLHeadingElement>
		| (() => void);
}
export default PopoverOptionPropsType;
