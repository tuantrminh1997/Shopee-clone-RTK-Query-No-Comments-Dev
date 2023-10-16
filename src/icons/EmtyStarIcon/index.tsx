import { IconPropsTypeInterface } from "src/types";

/* eslint-disable react/prop-types */
export default function EmtyStarIcon({ width = "14px", height = "14px", className, children }: IconPropsTypeInterface) {
	return (
		<svg viewBox='0 0 30 30' width={width} height={height} className={className}>
			<defs>
				<linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
					<stop offset='0%' stopColor='#FFD211' />
					<stop offset='100%' stopColor='#FFAD27' />
				</linearGradient>
			</defs>
			<path
				// fill='#ffce3d'
				fill='none'
				fillRule='evenodd'
				stroke='url(#star__hollow)'
				strokeWidth={2}
				d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
			/>
			{children}
		</svg>
	);
}
