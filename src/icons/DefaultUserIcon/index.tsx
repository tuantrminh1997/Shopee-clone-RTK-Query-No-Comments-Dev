import { IconPropsTypeInterface } from "src/types";

export default function DefaultUserIcon({ width = "24px", height = "24px", className }: IconPropsTypeInterface) {
	return (
		<svg
			width={width}
			height={height}
			enableBackground='new 0 0 15 15'
			viewBox='0 0 15 15'
			x={0}
			y={0}
			className={className}
		>
			<g>
				<circle cx='7.5' cy='4.5' fill='none' stroke='#c6c6c6' r='3.8' strokeMiterlimit={10} />
				<path
					d='m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6'
					fill='none'
					stroke='#c6c6c6'
					strokeLinecap='round'
					strokeMiterlimit={10}
				/>
			</g>
		</svg>
	);
}
