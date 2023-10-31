// react-router-dom
import { createSearchParams, useNavigate } from "react-router-dom";
// i18n
import { useTranslation } from "react-i18next";
// icons:
import { EmtyStarIcon, StarIcon } from "src/icons";
// types
import { RatingStarsFilterPropsType } from "src/types";
// constants
import { paths, asideFilterConstants } from "src/constants";

export default function RatingStarsFilter({ mobileResponsive = false, queryConfig }: RatingStarsFilterPropsType) {
	const { totalStarPosition } = asideFilterConstants;
	const navigate = useNavigate();
	const handleFilterRatingStars: (numberOfFullStars: number) => void = (numberOfFullStars: number) => {
		navigate({
			pathname: paths.defaultPath,
			search: createSearchParams({
				...queryConfig,
				rating_filter: String(numberOfFullStars),
			}).toString(),
		});
	};
	const { t } = useTranslation("productList");
	return (
		<div
			className={`flex ${
				mobileResponsive ? "flex-row lowMobile:grid lowMobile:grid-cols-3 lowMobile:grid-rows-2" : "flex-col"
			}  justify-between w-full`}
		>
			{Array(totalStarPosition)
				.fill(0)
				.map((_, index) => {
					const numberOfFullStars = totalStarPosition - index;
					const numberOfEmtyStars = index;
					return (
						<div
							key={index}
							className='flex mt-[10px] px-3 items-center cursor-pointer'
							onClick={() => handleFilterRatingStars(numberOfFullStars)}
							// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
							tabIndex={0}
							aria-hidden='true'
						>
							{!mobileResponsive && (
								<>
									{Array(numberOfFullStars)
										.fill(0)
										.map((_, index1) => (
											<StarIcon fill='#ffce3d' key={index1} className='mr-[4px]' />
										))}
									{Array(numberOfEmtyStars)
										.fill(0)
										.map((_, index2) => (
											<EmtyStarIcon key={index2} className='mr-[4px]' />
										))}
								</>
							)}
							{mobileResponsive && (
								<div className='flex bg-white px-2 py-2 rounded-sm'>
									<div className='flex items-center mr-1 sm:mr-[2px] capitalize'>
										<p className='mr-1'>{numberOfFullStars}</p>
										<StarIcon fill='#ffce3d' className='mr-[4px]' />
										<p className='text-xs lowercase'>{t("aside filter.up")}</p>
									</div>
								</div>
							)}
							{!mobileResponsive && !(numberOfFullStars === totalStarPosition) && <span className='ml-1 capitalize'>{t("aside filter.up")}</span>}
						</div>
					);
				})}
		</div>
	);
}
