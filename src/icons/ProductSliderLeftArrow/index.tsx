import { IconPropsTypeInterface } from "src/types";

export default function ProductSliderLeftArrow({ width = "20px", height = "20px", className }: IconPropsTypeInterface) {
	return (
		<svg
			enableBackground='new 0 0 13 20'
			viewBox='0 0 13 20'
			width={width}
			height={height}
			className={className}
			fill='white'
		>
			<polygon points='4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9' />
		</svg>
	);
}
