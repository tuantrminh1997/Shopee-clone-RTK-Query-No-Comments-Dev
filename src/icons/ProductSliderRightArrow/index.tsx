import { IconPropsTypeInterface } from "src/types";

export default function ProductSliderRightArrow({
	width = "20px",
	height = "20px",
	className,
}: IconPropsTypeInterface) {
	return (
		<svg
			enableBackground='new 0 0 13 21'
			viewBox='0 0 13 21'
			width={width}
			height={height}
			className={className}
			fill='white'
		>
			<polygon points='11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11' />
		</svg>
	);
}
