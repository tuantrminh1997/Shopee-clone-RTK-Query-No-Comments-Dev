import { IconPropsTypeInterface } from "src/types";

export default function EditProfileIcon({ width = "12px", height = "12px", className }: IconPropsTypeInterface) {
	return (
		<svg width={width} height={height} viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg' className={className}>
			<path
				d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
				fill='#9B9B9B'
				fillRule='evenodd'
			/>
		</svg>
	);
}
