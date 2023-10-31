import { Helmet } from "react-helmet-async";
import { QueryConfigType, ProductItemSuccessResponse, Category } from "src/types";
import { useEffect, useMemo } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useQueryConfig } from "src/hooks";
import { paths } from "src/constants";
import { useGetCategoriesQuery, useGetProductListQuery } from "src/sliceApis/productListSliceApi";
import { ProductItem } from "src/components";
import { SkeletonLoadingProductItem, Pagination, Sort, AsideFilter } from "./components";

export default function ProductList() {
	const queryConfig = useQueryConfig();
	const navigate = useNavigate();
	const { data: productListQueryData, isFetching: productListFetchingStatus } = useGetProductListQuery(queryConfig);
	const totalPage = productListQueryData?.data.pagination.page_size;
	const toFirstPage = useMemo(() => Number(queryConfig.page) > (totalPage as number), [queryConfig.page, totalPage]);

	useEffect(() => {
		if (toFirstPage) {
			const newSearchParams = createSearchParams({
				...queryConfig,
				page: "1",
			}).toString();
			navigate(`${paths.defaultPath}?${newSearchParams}`);
		}
	}, [navigate, toFirstPage, queryConfig]);

	const { data: categoriesQueryData } = useGetCategoriesQuery();
	return (
		<div className={`flex w-[1200px] ${!productListQueryData ? "min-h-1000px" : ""}`}>
			<Helmet>
				<title>Trang chủ | Shopee clone</title>
				<meta name='description' content='Trang chủ - Dự án Shopee clone' />
			</Helmet>
			<AsideFilter categoriesData={categoriesQueryData?.data as Category[]} queryConfig={queryConfig} />
			<div className={`flex flex-col justify-start ${!productListQueryData ? "h-full" : ""}`}>
				{productListFetchingStatus && (
					<div className='flex flex-wrap mt-2 w-[1000px] min-h-[800px] pb-10'>
						{Array(Number(queryConfig.limit))
							.fill(undefined)
							.map((_, index) => (
								<SkeletonLoadingProductItem key={index} />
							))}
					</div>
				)}
				{!productListQueryData && (
					<div className='flex flex-wrap mt-2 w-[1000px] min-h-[800px] pb-10'>
						{Array(Number(queryConfig.limit))
							.fill(undefined)
							.map((_, index) => (
								<SkeletonLoadingProductItem key={index} />
							))}
					</div>
				)}
				{productListQueryData && !productListFetchingStatus && (
					<>
						<Sort queryConfig={queryConfig} totalPage={totalPage as number} categoriesData={categoriesQueryData?.data as Category[]} />
						<div className='grid grid-cols-5 gap-2 xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 mt-2 pb-10 lowMobile:grid-cols-1'>
							{productListQueryData.data.products.map((product) => (
								<ProductItem key={product._id as string} product={product as ProductItemSuccessResponse} />
							))}
						</div>
						<Pagination queryConfig={queryConfig as QueryConfigType} totalPage={totalPage as number} />
					</>
				)}
			</div>
		</div>
	);
}
