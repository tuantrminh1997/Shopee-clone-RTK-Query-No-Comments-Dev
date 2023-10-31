// icons
import { ProductItemDetailStarIcon } from "src/icons";
import { StarRatingPropsType } from "src/types";

export default function StarRating({ isAtProductDetailPage = false, rating, className }: StarRatingPropsType) {
	const getStarRatingElementWidth = (index: number) => {
		if (index <= rating) {
			return "100%";
		} else if (index - rating < 1) {
			return `${(rating - Math.floor(rating)) * 100}%`;
		} else {
			return "0";
		}
	};
	return (
		<div className='flex'>
			{Array(5)
				.fill(0)
				.map((_, index) => {
					return (
						<div key={index} className={`${className} relative`}>
							<>
								<ProductItemDetailStarIcon
									fill={isAtProductDetailPage ? "#d0011b" : "#ffce3d"}
									className='h-full mr-[2px] absolute top-0 left-0'
									style={{ width: getStarRatingElementWidth(index + 1) }}
								/>
								<ProductItemDetailStarIcon className='mr-[2px]' stroke={isAtProductDetailPage ? "#d0011b" : "#ffce3d"} />
							</>
						</div>
					);
				})}
		</div>
	);
}
