import myAccountIcon from "src/assets/my-account-icon.png";
import { IconPropsTypeInterface } from "src/types";

export default function MyAccountIcon({ width = "20px", height = "20px", className }: IconPropsTypeInterface) {
	return <img className={`w-[${width}] h-[${height}] ${className}`} src={myAccountIcon} alt='myAccountIcon' />;
}
