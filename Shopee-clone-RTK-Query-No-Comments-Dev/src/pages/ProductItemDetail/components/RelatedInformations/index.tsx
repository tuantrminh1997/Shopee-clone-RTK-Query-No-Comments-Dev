// i18n
import { useTranslation } from "react-i18next";
// types
import { RelatedInformationsPropsType } from "src/types";
// private components:
import { TopSellingProductListLgResponsive, ProductItemDetailInformation, SimilarProductList, TopSellingProductList } from "./components";

export default function RelatedInformations({
	productItemDescription,
	similarProductListQueryData,
	similarSoldByProductListQueryData,
}: RelatedInformationsPropsType) {
	const { t } = useTranslation("productItemDetail");
	return (
		<div className='flex justify-between lg:flex-col w-full'>
			<div className='flex flex-col mt-[15px] basis-[80%] lg:basis-[100%] lg:order-1'>
				{/* Thông tin chi tiết của sản phẩm */}
				<ProductItemDetailInformation
					productItemDescription={productItemDescription as string}
					productDescription={t("related informations.product description")}
					showMoreTitle={t("productInformations.show more")}
					collapseTitle={t("productInformations.collapse")}
				/>
				{/* Top sản phẩm bán chạy hiển thị ngang trên màn hình Responsive */}
				<TopSellingProductListLgResponsive
					similarSoldByProductListQueryData={similarSoldByProductListQueryData}
					topPicksTitle={t("related informations.top picks from shop")}
				/>
				{/* Các sản phẩm cùng loại - Có thể bạn cũng thích  */}
				<SimilarProductList
					similarProductListQueryData={similarProductListQueryData}
					youMayAlsoLikeTitle={t("related informations.you may also like")}
				/>
			</div>
			{/* Top sản phẩm bán chạy trên màn hình máy tính */}
			<TopSellingProductList
				similarSoldByProductListQueryData={similarSoldByProductListQueryData}
				topPicksTitle={t("related informations.top picks from shop")}
			/>
		</div>
	);
}
