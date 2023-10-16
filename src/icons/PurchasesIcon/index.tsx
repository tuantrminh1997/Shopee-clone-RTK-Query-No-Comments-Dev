import purchasesIcon from "src/assets/purchases-icon.png";
import { IconPropsTypeInterface } from "src/types";

export default function PurchasesIcon({ width = "20px", height = "20px", className }: IconPropsTypeInterface) {
	return <img className={`w-[${width} h-[${height}] ${className}`} src={purchasesIcon} alt='purchasesIcon' />;
}
