import { IconPropsTypeInterface } from "src/types";

export default function CartIcon({ width = "26", height = "26", className }: IconPropsTypeInterface) {
	return (
		<svg viewBox='0 0 26.6 25.6' width={width} height={height} fill='white' className={className}>
			<title>Shopping Cart Icon</title>
			<polyline
				points='2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit={10}
				strokeWidth='2.5'
				fill='none'
				stroke='white'
			/>
			<circle cx='10.7' cy={23} r='2.2' stroke='none' />
			<circle cx='19.7' cy={23} r='2.2' stroke='none' />
		</svg>
	);
}
