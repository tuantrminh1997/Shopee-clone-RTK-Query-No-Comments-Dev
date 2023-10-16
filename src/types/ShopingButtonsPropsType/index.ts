interface ShopingButtonsPropsType {
	handleAddToCart: () => void;
	handleBuyNow: () => Promise<void>;
	addToCartTitle: string;
	buyNowTitle: string;
}
export default ShopingButtonsPropsType;
