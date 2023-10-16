import { ProductItemSuccessResponse } from "src/types";

interface ProductItemInformationPropsType {
	productItemDetailData: ProductItemSuccessResponse;
	setNumberOfProducts: React.Dispatch<React.SetStateAction<number>>;
	handleSetNumberOfProducts: (value: number) => void;
	numberOfProducts: number;
	handleAddToCart: () => void;
	handleBuyNow: () => Promise<void>;
	itemNameId: string;
}
export default ProductItemInformationPropsType;
