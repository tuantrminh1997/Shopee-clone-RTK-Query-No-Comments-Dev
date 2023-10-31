// material UI
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// constants:
import { cartTextAttributes } from "src/constants";
// types:
import { ShopingButtonsPropsType } from "src/types";

export default function ShopingButtons({
	handleAddToCart,
	handleBuyNow,
	addToCartTitle,
	buyNowTitle,
}: ShopingButtonsPropsType) {
	const {} = cartTextAttributes;
	return (
		<div className='flex justify-start text-sm mb-8 lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:justify-center lg:text-xl lg:z-50 lg:mb-0'>
			<button
				className='bg-[#FF57221A] min-w-[33.33%] border rounded-sm border-[#ee4d2d] flex hover:bg-[rgba(255,197,178,.181)] mr-[15px] lg:basis-[50%] lg:!bg-green-900 lg:border-green-900 lg:text-white lg:mr-0'
				onClick={handleAddToCart}
			>
				<div className='flex items-center justify-between m-auto px-7 py-3 lg:flex-col '>
					<div className='w-[18px] h-[18px] lg:w-[50px] lg:h-[50px] '>
						<AddShoppingCartIcon
							sx={{
								width: "100%",
								height: "100%",
							}}
						/>
					</div>
					<span className='text-[#ee4d2d] ml-1 lg:text-white lowMobile:text-sm capitalize'>{addToCartTitle}</span>
				</div>
			</button>
			<button
				className='bg-[#ee4d2d] min-w-[33.33%]  border border-[#ee4d2d] rounded-sm flex hover:bg-[#f05d40] px-16 py-3 lg:basis-[50%]'
				onClick={handleBuyNow}
			>
				<span className='text-white m-auto capitalize'>{buyNowTitle}</span>
			</button>
		</div>
	);
}
