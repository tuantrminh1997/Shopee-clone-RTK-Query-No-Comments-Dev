import { IconPropsTypeInterface } from "src/types";

export default function ProductItemDetailStarIcon({
	width = "13px",
	height = "13px",
	style,
	className,
	fill = "white",
	children,
	stroke,
}: IconPropsTypeInterface) {
	return (
		<svg
			enableBackground='new 0 0 15 15'
			viewBox='0 0 15 15'
			width={width}
			height={height}
			className={className}
			// fill đặt ở thẻ svg bao quanh bên ngoài -> màu bên trong
			fill={fill}
			style={style}
		>
			<polygon
				points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
				strokeLinecap='round'
				strokeLinejoin='round'
				// Thuộc tính stroke đặt trong polygon -> màu viền đường bao
				stroke={stroke}
				strokeMiterlimit={10}
			/>
			{children}
		</svg>
	);
}
