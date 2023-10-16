import { IconPropsTypeInterface } from "src/types";

export default function HeartIcon({ width = "24px", height = "20px", className }: IconPropsTypeInterface) {
	return (
		<svg width={width} height={height} className={className}>
			<path
				d='M19.469 1.262c-5.284-1.53-7.47 4.142-7.47 4.142S9.815-.269 4.532 1.262C-1.937 3.138.44 13.832 12 19.333c11.559-5.501 13.938-16.195 7.469-18.07z'
				stroke='#FF424F'
				strokeWidth='1.5'
				fill='none'
				fillRule='evenodd'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
