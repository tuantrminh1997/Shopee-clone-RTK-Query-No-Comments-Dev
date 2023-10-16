// react router dom
import { Link } from "react-router-dom";
// types
import { TopSellingProductListPropsType } from "src/types";
// constants
import { paths, productItemAttributes } from "src/constants";
// utils
import { formatCurrency, generateNameIdStringUrl } from "src/utils";

export default function TopSellingProductList({ topPicksTitle, similarSoldByProductListQueryData }: TopSellingProductListPropsType) {
	const similarSoldByProductList = similarSoldByProductListQueryData?.data?.products;
	const { currencyUnit } = productItemAttributes;

	return (
		// height = fit-content = tự động có chiều cao thích nghi với các phần tử bên trong
		<div className='flex flex-col mt-[15px] pt-[10px] rounded-sm bg-white basis-[18%] h-fit lg:hidden'>
			<span className='text-sm text-[#00000066] px-5 mt-[10px] capitalize'>{topPicksTitle}</span>
			{similarSoldByProductList?.map((similarSoldByProduct) => {
				const { image: imageSrc, name, price, price_before_discount, _id } = similarSoldByProduct;
				return (
					<Link to={`${paths.productList}${generateNameIdStringUrl({ name, id: _id })}`} className='flex flex-col cursor-pointer' key={name}>
						<div className='flex flex-col pt-5 px-5 border-b border-[rgba(0,0,0,.09)]'>
							<img className='rouned-sm basis-[80%]' src={imageSrc} alt={name} />
							<div className='flex flex-col px-[10px] pt-[10px]'>
								<p className='text-sm text-[#000000cc] overflow-hidden line-clamp-2 mb-1 basis-[50%]'>{name}</p>
								{price_before_discount > price && (
									<div className='flex text-base text-[#D0011B] h-[42px] items-start'>
										<p className='text-xs underline mr-1 leading-[20px]'>{currencyUnit}</p>
										<p>{formatCurrency(price)}</p>
									</div>
								)}
								{price_before_discount < price && (
									<div className='flex justify-between text-sm text-[#D0011B]'>
										<div className='flex h-[42px] items-start'>
											<p className='text-xs underline mr-1 leading-[20px]'>{currencyUnit}</p>
											<p>{formatCurrency(price)}</p>
										</div>
										<div>-</div>
										<div className='flex h-[42px] items-start'>
											<p className='text-xs underline mr-1 leading-[20px]'>{currencyUnit}</p>
											<p>{formatCurrency(price)}</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
