import { IconPropsTypeInterface } from "src/types";

/* eslint-disable react/prop-types */
export default function ArrowDownIcon({
	width = "12",
	height = "12",
	className,
	isRotate = false,
}: IconPropsTypeInterface) {
	return (
		<svg
			viewBox='0 0 12 12'
			fill='none'
			width={width}
			height={height}
			color='currentColor'
			className={`${isRotate ? "transform rotate-180" : ""}  ${className}`}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z'
				fill='currentColor'
			/>
		</svg>
	);
}
