// types
import { SimilarProductListPropsType } from "src/types";
// components:
import { ProductItem } from "src/components";

export default function SimilarProductList({ youMayAlsoLikeTitle, similarProductListQueryData }: SimilarProductListPropsType) {
	return (
		<div className='flex flex-col w-full'>
			<div className='flex'>
				<span className='text-base text-[#0000008A] pt-5 pb-3 uppercase lg:text-black lg:min-w-full lg:text-center lg:capitalize'>
					{youMayAlsoLikeTitle}
				</span>
			</div>
			<div className='grid grid-cols-5 gap-1 xl:grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1'>
				{similarProductListQueryData &&
					similarProductListQueryData.data.products.map((productItem) => (
						<ProductItem key={productItem._id} product={productItem} classProductItemWSizeMainAxis={"basis-[calc(100%/6)]"} />
					))}
			</div>
		</div>
	);
}
