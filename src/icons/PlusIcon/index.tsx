import { IconPropsTypeInterface } from "src/types";

export default function PlusIcon({ width = "10", height = "10", className }: IconPropsTypeInterface) {
	return (
		<svg
			enableBackground='new 0 0 10 10'
			viewBox='0 0 10 10'
			x={0}
			y={0}
			width={width}
			height={height}
			className={className}
		>
			<polygon points='10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5' />
		</svg>
	);
}
