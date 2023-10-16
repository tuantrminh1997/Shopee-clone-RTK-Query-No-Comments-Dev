import { IconPropsTypeInterface } from "src/types";

export default function RightArrowBreadCrumIcon({ width = "10px", height = "10px" }: IconPropsTypeInterface) {
	return (
		<svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' width={width} height={height}>
			<path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
		</svg>
	);
}
