import { IconPropsTypeInterface } from "src/types";

export default function MinusIcon({ width = "10", height = "10", className }: IconPropsTypeInterface) {
	return (
		<svg enableBackground='new 0 0 10 10' viewBox='0 0 10 10' width={width} height={height} className={className}>
			<polygon points='4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5' />
		</svg>
	);
}
