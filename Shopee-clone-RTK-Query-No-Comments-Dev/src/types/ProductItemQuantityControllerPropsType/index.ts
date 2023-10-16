import { InputNumberPropsType } from "src/types";
import { FieldValues } from "react-hook-form";

interface ProductItemQuantityControllerPropsType extends InputNumberPropsType<FieldValues> {
	// Max -> giá trị tối đa của sản phẩm trong kho hàng
	// -> khi cố tình tăng quantity vượt quá
	// -> tự động reset về max quantity available đồng thời hiển thị thông báo.
	maxQuantityAvailable?: number;
	// Sự kiện tăng và giảm số lượng sản phẩm
	onIncreaseQuantity?: (value: number) => void;
	onDecreaseQuantity?: (value: number) => void;
	// sự kiện nhập tay số lượng sản phẩm
	onTypeQuantity?: (value: number) => void;
	onFocusOut?: (value: number) => void;
	classNameInnerDiv?: string;
	itemNameId?: string | undefined;
	value?: number;
	classNameContainer?: string;
	piecesAvailableTitlte?: string;
	quantityControllerTitle?: string;
}
export default ProductItemQuantityControllerPropsType;
