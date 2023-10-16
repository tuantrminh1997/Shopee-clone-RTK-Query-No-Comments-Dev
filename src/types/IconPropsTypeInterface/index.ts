interface IconPropsTypeInterface {
	width?: string;
	height?: string;
	className?: string;
	// fill đặt ở thẻ svg bao quanh bên ngoài -> màu bên trong
	fill?: string;
	// Thuộc tính stroke đặt trong polygon -> màu viền đường bao
	stroke?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
	isRotate?: boolean;
}
export default IconPropsTypeInterface;
