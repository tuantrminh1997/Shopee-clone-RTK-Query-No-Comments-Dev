/* eslint-disable @typescript-eslint/no-explicit-any */
// classNames:
import classNames from "classnames";
// react router dom
import { createSearchParams, useNavigate } from "react-router-dom";
// lodash:
import omit from "lodash/omit";
// react hook form
import { useForm, Controller } from "react-hook-form";
// i18n
import { useTranslation } from "react-i18next";
// icons:
import { PreviousIcon, NextIcon, ArrowDownIcon, TickIcon, RightArrowIcon } from "src/icons";
// common components:
import { Button, InputNumber, Popover, PopoverHoverTarget, PopoverOption, RatingStarsFilter } from "src/components";
// types
import { FilterPriceFormData, PaginationPropsType, ProductListQueryParams } from "src/types";
// constants:
import { sortBy, order, paths } from "src/constants";
import { filterPriceSchema } from "src/utils";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Sort({ categoriesData, totalPage, queryConfig }: PaginationPropsType) {
	// pages:
	const currentPage: number = Number(queryConfig.page);

	const {
		// control -> 1 sự thay thế cho register -> đặt 1 component Input vào tầm theo dõi, để có thể validate, trigger, handle error
		control,
		formState: { errors },
		handleSubmit,
		reset: resetFilterForm,
	} = useForm<FilterPriceFormData>({
		defaultValues: {
			priceMin: "",
			priceMax: "",
		},
		resolver: yupResolver<FilterPriceFormData>(filterPriceSchema as any),
		shouldFocusError: true,
	});

	const { category, sort_by = sortBy.createdAt } = queryConfig;

	// sử dụng hook useNavigate thay vì Component Link:
	const navigate = useNavigate();

	// bỏ đi kiểu undefined của sortByValue = Exclude
	const isActiveSortBy = (sortByValue: Exclude<ProductListQueryParams["sort_by"], undefined>) => sort_by === sortByValue;

	// Method quản lý sắp xếp theo Phổ biến, Mới nhất, Bán chạy
	const handleOverrideSortByUrl: (sortByValue: Exclude<ProductListQueryParams["sort_by"], undefined>) => void = (
		// sử dụng Exclude<T, undefined> -> biến được ép kiểu sẽ có type cụ thể = T và không còn undefined
		sortByValue: Exclude<ProductListQueryParams["sort_by"], undefined>,
	) => {
		// Bắn khối url lên thanh url -> thu vào object queryConfig -> call API get List
		navigate({
			pathname: paths.defaultPath,
			search: createSearchParams(
				omit(
					{
						// Tiến hành ghi đè giá trị mới của thuộc tính sort_by trong object queryConfig bằng giá trị sortByValue được truyền vào
						...queryConfig,
						sort_by: sortByValue,
						// chuyển từ URLSearchParams sang string để phù hợp với giá trị mong muốn của thuộc tính search
					},
					["order"],
				),
			).toString(),
		});
	};

	// Method quản lý chức năng sắp xếp theo giá
	const handleOverrideSortByOrderUrl: (orderValue: Exclude<ProductListQueryParams["order"], undefined>) => void = (
		orderValue: Exclude<ProductListQueryParams["order"], undefined>,
	) => {
		navigate({
			pathname: paths.defaultPath,
			search: createSearchParams({
				...queryConfig,
				sort_by: sortBy.price,
				order: orderValue,
			}).toString(),
		});
	};

	// Hàm submitForm filter theo khoảng giá
	const onSubmit = handleSubmit((filterFormData) => {
		navigate({
			pathname: paths.defaultPath,
			search: createSearchParams({
				...queryConfig,
				price_min: filterFormData.priceMin,
				price_max: filterFormData.priceMax,
			}).toString(),
		});
	});

	// Hàm quản lý chức năng xoá tất cả filter tại AsideFilter:
	const handleRemoveAllFilterParams: () => void = () => {
		resetFilterForm(),
			// xoá: category, price_min, price_max, rating_filter
			navigate({
				pathname: paths.defaultPath,
				search: createSearchParams(
					omit(
						{
							...queryConfig,
						},
						["category", "price_min", "price_max", "rating_filter"],
					),
				).toString(),
			});
	};

	const { t } = useTranslation("productList");

	return (
		<div className='flex items-center lg:flex-col px-5 py-[13px] bg-slate-100 font-normal text-sm lg:text-base rounded-sm justify-between w-full '>
			{/* Vùng Sorting cho Responsive */}
			<div className='hidden lg:flex items-center lg:w-full mb-6 lowMobile:flex-col'>
				<span className='text-left lowMobile:text-center text-[#555] text-sm mr-[5px] lg:min-w-[20%] lowMobile:pb-1 capitalize'>
					{t("aside filter.all categories")}
				</span>
				<div className='lg:flex-1 lg:flex lowMobile:flex'>
					{categoriesData?.map((categoryItem) => {
						const isActive = category === categoryItem._id;
						return (
							<Button
								childrenClassName={"flex items-center lowerMobile:justify-start"}
								to={{
									pathname: paths.defaultPath,
									search: createSearchParams({
										...queryConfig,
										category: categoryItem._id,
									}).toString(),
								}}
								key={categoryItem._id}
								className={classNames(
									"py-2 pl-3 pr-[10px] cursor-pointer lg:flex-1 capitalize lowMobile:min-w-[147px] lowerMobile:min-w-[116px] lowMobile:ml-[-20px] lowMobile:mr-[-20px] lowerMobile:ml-[-15px]",
									{
										"text-[#EE4D2D]": isActive,
									},
								)}
							>
								<RightArrowIcon fill={isActive ? "#EE4D2D" : "none"} />
								<span className='ml-2'>{categoryItem.name}</span>
							</Button>
						);
					})}
				</div>
			</div>
			{/* Sắp xếp theo khoảng giá */}
			<div className='hidden lg:flex items-center lg:w-full mb-6 lowMobile:flex-col'>
				<span className='text-[#555] text-sm mr-[5px] lg:mr-0 lg:min-w-[20%] lowMobile:pb-1 capitalize lowMobile:text-center text-left'>
					{t("aside filter.price range")}
				</span>
				<form className='flex lg:flex-1 lowMobile:flex-col flex-[3]' onSubmit={onSubmit}>
					<div className='flex flex-col justify-between items-center flex-1'>
						<div className='flex items-center justify-between w-full basis-[45%]'>
							<Controller
								control={control}
								name='priceMin'
								render={({ field }) => (
									<InputNumber
										classNameInput={
											"capitalize h-full bg-[#fff] border border-[rgba(0,0,0,.26)] shadow-slate-600 rounded-sm pl-2 py-[15px] text-xs outline-none lg:ml-[12px] lowMobile:ml-0"
										}
										type='text'
										placeholder={t("aside filter.min")}
										{...field}
										onChange={(event: any) => {
											field.onChange(event);
											trigger("priceMax");
										}}
									/>
								)}
							/>
							<div className='h-[0.5px] w-3 bg-[#bdbdbd]'></div>
							<Controller
								control={control}
								name='priceMax'
								render={({ field }) => (
									<InputNumber
										classNameInput={
											"capitalize h-full bg-[#fff] border border-[rgba(0,0,0,.26)] shadow-slate-600 rounded-sm pl-2 py-[15px] text-xs outline-none"
										}
										type={"text"}
										placeholder={t("aside filter.max")}
										{...field}
										onChange={(event: any) => {
											field.onChange(event);
											trigger("priceMin");
										}}
									/>
								)}
							/>
						</div>
						<div className='flex justify-between items-center w-full basis-[45%] text-[11px] text-[#EE4D2D]'>
							<span className='text-center text-sm mt-2 min-h-[20px'>{errors ? errors.priceMin?.message : ""}</span>
						</div>
					</div>
					<div className='h-[0.5px] w-3 lowMobile:hidden'></div>
					<button className='flex-1 max-h-[46px] uppercase text-white bg-[#ee4d2d] rounded-sm lowMobile:py-2' type='submit'>
						{t("aside filter.apply")}
					</button>
				</form>
			</div>
			{/* Filter theo star rating */}
			<div className='hidden lg:flex items-center lg:w-full mb-6 lowMobile:flex-col'>
				<span className='text-[#555] text-left text-sm mr-[5px] lg:mr-0 lg:min-w-[20%] capitalize lowMobile:text-center'>
					{t("aside filter.rating")}
				</span>
				<div className='flex-1'>
					<RatingStarsFilter queryConfig={queryConfig} mobileResponsive />
				</div>
			</div>
			{/* Button xoá bộ lọc */}
			<button className='hidden lg:block py-4 w-[80%] uppercase text-white bg-[#ee4d2d] rounded-sm mb-9' onClick={handleRemoveAllFilterParams}>
				{t("aside filter.clear all")}
			</button>
			{/* Sorting */}
			<div className='flex items-center lg:w-full lowMobile:flex-col'>
				<span className='text-[#555] text-sm mr-[5px] lg:min-w-[20%] lowMobile:pb-2 lowMobile:text-center text-left capitalize'>
					{t("sorting.sort by")}
				</span>
				<div className='flex lg:flex-1 lg:justify-between lowMobile:grid lowMobile:grid-cols-2 lowMobile:grid-rows-2 lowMobile:gap-2'>
					{/* Sắp xếp theo độ phổ biến */}
					<button
						className={classNames(
							"h-[35px] lg:flex-1 rounded-[2px] px-[15px] ml-[10px] lg:ml-0 lg:mr-2 lowMobile:mr-0 lg:h-[50px] md:flex-1 capitalize",
							{
								"bg-[#ee4d2d] text-white": isActiveSortBy(sortBy.view),
								"bg-white": !isActiveSortBy(sortBy.view),
							},
						)}
						onClick={() => handleOverrideSortByUrl(sortBy.view)}
					>
						{t("sorting.popular")}
					</button>
					{/* Sắp xếp theo Mới nhất */}
					<button
						className={classNames(
							"h-[35px] lg:flex-1 rounded-[2px] px-[15px] mr-2 ml-[10px] lg:ml-0 lg:mr-2 lowMobile:mr-0 lg:h-[50px] md:flex-1 capitalize",
							{
								"bg-[#ee4d2d] text-white": isActiveSortBy(sortBy.createdAt),
								"bg-white": !isActiveSortBy(sortBy.createdAt),
							},
						)}
						onClick={() => handleOverrideSortByUrl(sortBy.createdAt)}
					>
						{t("sorting.latest")}
					</button>
					{/* Sắp xếp theo Bán chạy */}
					<button
						className={classNames("h-[35px] lg:flex-1 rounded-[2px] px-[15px] lg:h-[50px] capitalize", {
							"bg-[#ee4d2d] text-white": isActiveSortBy(sortBy.sold),
							"bg-white": !isActiveSortBy(sortBy.sold),
						})}
						onClick={() => handleOverrideSortByUrl(sortBy.sold)}
					>
						{t("sorting.top sales")}
					</button>
					{/* Sắp xếp theo giá */}
					{/* Tái sử dụng component Popover */}
					<Popover
						hoverTargetclassName={"lg:flex-1"}
						hoverTarget={
							<PopoverHoverTarget
								title={
									<>
										<span className='pl-3 pr-[10px] capitalize'>
											{!queryConfig.order && t("sorting.price")}
											{queryConfig.order === "asc" && (
												<p>
													{t("sorting.price")}: {t("sorting.low to high")}
												</p>
											)}
											{queryConfig.order === "desc" && (
												<p>
													{t("sorting.price")}: {t("sorting.high to low")}
												</p>
											)}
										</span>
										<ArrowDownIcon height='14px' />
									</>
								}
								containerClassName='flex lg:flex-1 lg:h-[50px] items-center justify-between rounded-sm min-w-[200px] bg-white ml-[10px] h-[35px] pr-3 cursor-pointer lowMobile:ml-0 lowMobile:min-w-[163.5px] lowerMobile:min-w-[147.5px]'
							/>
						}
						offsetValue={-16}
						popoverContent={
							<div className='popoverContentLanguagesContainerStyle z-[1000]'>
								<div className='flex flex-col'>
									<PopoverOption
										containerClassName={"popoverSortPriceOptionContainerStyles"}
										//innerClassName = className của thẻ con
										innerClassName={"popoverSortPriceOptionItemStyles mt-[10px]"}
										title={
											<div className='flex justify-between items-center capitalize'>
												{t("sorting.price")}: {t("sorting.low to high")}
												<TickIcon fill={queryConfig.order === "asc" ? "#ee4d2d" : "none"} />
											</div>
										}
										onclick={() => handleOverrideSortByOrderUrl(order.asc)}
									/>
									<PopoverOption
										containerClassName={"popoverSortPriceOptionContainerStyles"}
										innerClassName={"popoverSortPriceOptionItemStyles"}
										title={
											<div className='flex justify-between items-center capitalize'>
												{t("sorting.price")}: {t("sorting.high to low")}
												<TickIcon fill={queryConfig.order === "desc" ? "#ee4d2d" : "none"} />
											</div>
										}
										onclick={() => handleOverrideSortByOrderUrl(order.desc)}
									/>
								</div>
							</div>
						}
						popoverArrowClassName='display-none'
					/>
				</div>
			</div>
			{/* Pagination cho màn hình responsive */}
			<div className='hidden lg:mt-5 lg:flex items-center lg:w-full mb-6 lowMobile:flex-col'>
				<span className='lowMobile:text-center text-[#555] text-sm mr-[5px] lg:min-w-[20%] lowMobile:pb-1 capitalize mb-2'>
					{t("aside filter.pagination")}
				</span>
				<div className='flex items-center'>
					<div className='text-sm lg:text-xl'>
						<span className='text-[#ee4d2d]'>{currentPage}</span>
						<span>/{totalPage}</span>
					</div>
					<div className='ml-5 flex items-center'>
						{currentPage === 1 ? (
							<Button
								className='flex items-center justify-center outline-none border border-[rgba(0,0,0,.09)] rounded-sm px-10 py-2 lg:h-[50px] lg:ml-0'
								childrenClassName={"m-auto"}
								disabled
							>
								<PreviousIcon width='14px' height='14px' fill='rgba(0,0,0,.1)' />
							</Button>
						) : (
							<Button
								to={{
									pathname: paths.defaultPath,
									search: createSearchParams({
										...queryConfig,
										page: (currentPage - 1).toString(),
									}).toString(),
								}}
								className='flex lg:h-[50px] lg:ml-0 items-center justify-center outline-none border border-[rgba(0,0,0,.09)] rounded-sm px-10 py-2 hover:bg-[#fdfdfd]'
								childrenClassName={"m-auto"}
							>
								<PreviousIcon width='14px' height='14px' fill='rgba(0,0,0,.4)' />
							</Button>
						)}
						{currentPage === totalPage ? (
							<Button
								className='flex lg:h-[50px] lg:ml-0 items-center justify-center outline-none border border-[rgba(0,0,0,.09)] rounded-sm px-10 py-2'
								childrenClassName={"m-auto"}
								disabled
							>
								<NextIcon width='14px' height='14px' fill='rgba(0,0,0,.1)' />
							</Button>
						) : (
							<Button
								to={{
									pathname: paths.defaultPath,
									search: createSearchParams({
										...queryConfig,
										page: (currentPage + 1).toString(),
									}).toString(),
								}}
								className='flex lg:h-[50px] lg:ml-0 items-center justify-center outline-none border border-[rgba(0,0,0,.09)] rounded-sm px-10 py-2 hover:bg-[#fdfdfd]'
								childrenClassName={"m-auto"}
							>
								<NextIcon width='14px' height='14px' fill='rgba(0,0,0,.4)' />
							</Button>
						)}
					</div>
				</div>
			</div>
			{/* Pagination */}
			<div className='flex items-center lg:hidden'>
				<div className='text-sm lg:text-xl'>
					<span className='text-[#ee4d2d]'>{currentPage}</span>
					<span>/{totalPage}</span>
				</div>
				<div className='ml-5 flex items-center'>
					{currentPage === 1 ? (
						<Button
							className='flex items-center justify-center outline-none border border-[rgba(0,0,0,.09)] rounded-sm px-2 py-2 lg:h-[50px] lg:ml-0'
							childrenClassName={"m-auto"}
							disabled
						>
							<PreviousIcon width='14px' height='14px' fill='rgba(0,0,0,.1)' />
						</Button>
					) : (
						<Button
							to={{
								pathname: paths.defaultPath,
								search: createSearchParams({
									...queryConfig,
									page: (currentPage - 1).toString(),
								}).toString(),
							}}
							className='flex lg:h-[50px] lg:ml-0 items-center justify-center outline-none border border-[rgba(0,0,0,.09)] rounded-sm px-2 py-2 hover:bg-[#fdfdfd]'
							childrenClassName={"m-auto"}
						>
							<PreviousIcon width='14px' height='14px' fill='rgba(0,0,0,.4)' />
						</Button>
					)}
					{currentPage === totalPage ? (
						<Button
							className='flex lg:h-[50px] lg:ml-0 items-center justify-center outline-none border border-[rgba(0,0,0,.09)] rounded-sm px-2 py-2'
							childrenClassName={"m-auto"}
							disabled
						>
							<NextIcon width='14px' height='14px' fill='rgba(0,0,0,.1)' />
						</Button>
					) : (
						<Button
							to={{
								pathname: paths.defaultPath,
								search: createSearchParams({
									...queryConfig,
									page: (currentPage + 1).toString(),
								}).toString(),
							}}
							className='flex lg:h-[50px] lg:ml-0 items-center justify-center outline-none border border-[rgba(0,0,0,.09)] rounded-sm px-2 py-2 hover:bg-[#fdfdfd]'
							childrenClassName={"m-auto"}
						>
							<NextIcon width='14px' height='14px' fill='rgba(0,0,0,.4)' />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
