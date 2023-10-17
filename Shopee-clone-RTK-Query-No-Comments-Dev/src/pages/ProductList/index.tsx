// Sử dụng {Helmet} từ react helmet async thay vì { Helmet } từ react-helmet -> handle vấn đề báo lỗi ở console Using UNSAFE_componentWillMount ...v...v.....
import { Helmet } from "react-helmet-async";
// types
import { QueryConfigType, ProductItemSuccessResponse, Category } from "src/types";
// custome hooks
import { useQueryConfig } from "src/hooks";
// RTK Query hooks
import { useGetCategoriesQuery, useGetProductListQuery } from "src/sliceApis/productListSliceApi";
// common components:
import { ProductItem } from "src/components";
// private components:
import { SkeletonLoadingProductItem, Pagination, Sort, AsideFilter } from "./components";

export default function ProductList() {
	const queryConfig = useQueryConfig();

	// query quản lý chức năng get ProductList
	const { data: productListQueryData, isFetching: productListFetchingStatus } = useGetProductListQuery(queryConfig);

	// query quản lý chức năng get Categories:
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
						<Sort
							queryConfig={queryConfig}
							totalPage={productListQueryData.data.pagination.page_size as number}
							categoriesData={categoriesQueryData?.data as Category[]}
						/>
						<div className='grid grid-cols-5 gap-2 xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 mt-2 pb-10 lowMobile:grid-cols-1'>
							{productListQueryData.data.products.map((product) => (
								<ProductItem key={product._id as string} product={product as ProductItemSuccessResponse} />
							))}
						</div>
						<Pagination queryConfig={queryConfig as QueryConfigType} totalPage={productListQueryData.data.pagination.page_size as number} />
					</>
				)}
			</div>
		</div>
	);
}
