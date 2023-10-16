import { IconPropsTypeInterface } from "src/types";

export default function RightArrowIcon({ className, fill }: IconPropsTypeInterface) {
	return (
		<svg viewBox='0 0 4 7' className={className} height={8} width={8} fill={fill}>
			<polygon points='4 3.5 0 0 0 7' />
		</svg>
	);
}
