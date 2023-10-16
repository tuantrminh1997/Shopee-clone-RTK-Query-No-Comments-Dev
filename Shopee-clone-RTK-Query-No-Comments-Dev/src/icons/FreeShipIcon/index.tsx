import freeShipIcon from "src/assets/free-ship.png";
import { IconPropsTypeInterface } from "src/types";

export default function FreeShipIcon({ width = "24px", height = "20px", className }: IconPropsTypeInterface) {
	return <img className={`w-[${width}] h-[${height}] ${className}`} src={freeShipIcon} alt='freeShipIcon' />;
}
