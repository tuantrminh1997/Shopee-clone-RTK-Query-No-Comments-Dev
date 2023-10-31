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
		// sử dụng trigger
		// handle vấn đề: khi xảy ra lỗi và tiếp tục nhập 1 trong 2 thanh input, thanh input còn lại bị mất validate, dẫn đến nếu hết lỗi ở thanh đó thì không
		// không được react hook form ghi nhận, dẫn đến lỗi ở thanh input đó vẫn bị lưu ở formState: {errors}
		trigger,
		// type FilterPriceFormData có dạng kế thừa lại cấu trúc của schema filterPriceSchema
		// -> data khi success của handleSubmit có dạng FilterPriceFormData
		// -> Khi vi phạm quy tắc trong Schema filterPriceSchema ta định nghĩa -> xuất ra errors (quy định trong Schema) -> lưu vào biến errors
		// -> đồng thời form ta đang hướng đến có dạng của FilterPriceFormData: { priceMin: string, priceMax: string }
		// -> defaultValues có cấu trúc của FilterPriceFormData
	} = useForm<FilterPriceFormData>({
		// Chú ý: type FilterPriceFormData = {
		//     priceMax?: string | undefined;
		//     priceMin?: string | undefined;
		// }
		// -> priceMax và priceMin ở đây đang có thể nhận undefined do ta không hề set require ở trong Schema
		// -> handle việc loại bỏ undefined ở đây bằng cách sử dụng src/utils/NoUndefinedField
		defaultValues: {
			// name phải trùng với 1 thuộc tính trong type được truyền vào Generic Parameter của useForm, ở đây là FilterPriceFormData
			priceMin: "",
			priceMax: "",
		},
		// Xuẩt hiện lỗi typescript tại đây:
		// - Lỗi TypeScript này xuất phát từ việc không khớp giữa hai loại ResolverOptions trong TypeScript. Cụ thể, trong quá trình gán giá trị cho resolver, TypeScript phát hiện
		// ra rằng các tùy chọn (options) được truyền vào không tương thích với các kiểu dữ liệu yêu cầu bởi Resolver.
		// - Ở đoạn lỗi này, có hai phần quan trọng cần xem xét:

		// 1. Type 'Resolver<{ priceMin: string | undefined; priceMax: string | undefined; }>' (kiểu Schema filterPriceSchema) is not assignable to
		// type 'Resolver<NoUndefinedField<{ priceMax?: string | undefined; priceMin?: string | undefined; }>, any>'.
		// Đây là thông báo lỗi chính, nó đang nói rằng giá trị được truyền vào resolver không khớp với kiểu dữ liệu được yêu cầu bởi Resolver.
		// Cụ thể, kiểu { priceMin: string | undefined; priceMax: string | undefined; } (kiểu Schema filterPriceSchema) không tương thích với kiểu
		// NoUndefinedField<{ priceMax?: string | undefined; priceMin?: string | undefined; }> (kiểu FilterPriceFormData)
		// -> kiểu filterPriceSchema đang không tương thích với kiểu FilterPriceFormData

		// 2. Types of parameters 'options' and 'options' are incompatible.
		// Đây là thông báo lỗi cụ thể hơn, nó đang báo cáo rằng hai kiểu dữ liệu của tham số 'options' không tương thích với nhau.
		// -> Để khắc phục lỗi này, bạn cần xem xét cách bạn khai báo và sử dụng ResolverOptions. Đảm bảo rằng kiểu dữ liệu của resolver và kiểu dữ liệu được yêu cầu bởi Resolver
		// khớp nhau. Điều này bao gồm việc đảm bảo các thuộc tính không được định nghĩa (undefined) khi cần thiết và tuân thủ chính xác các yêu cầu của ResolverOptions.
		resolver: yupResolver<FilterPriceFormData>(filterPriceSchema as any),
		// Xem tại trang chủ -> shouldFocusError mặc định là true, khi submit form bị error -> mặc định focus vào thẻ input đầu tiên
		// chú ý là chỉ tự đỘng focus ở đây khi handle ref cho thanh input (field.ref -> tại component forwardRef)
		// Còn trong trường hợp
		shouldFocusError: true,
	});

	// theo document API:
	// - `sort_by`: 'createdAt' || 'view' || 'sold' || 'price'. Sắp xếp theo trường. Mặc định là 'createdAt'.
	// queryConfig là object lưu trữ giá trị query params lấy được từ url
	const { category, sort_by = sortBy.createdAt } = queryConfig;

	// sử dụng hook useNavigate thay vì Component Link:
	const navigate = useNavigate();

	// bỏ đi kiểu undefined của sortByValue = Exclude
	const isActiveSortBy = (sortByValue: Exclude<ProductListQueryParams["sort_by"], undefined>) =>
		sort_by === sortByValue;

	// Method quản lý sắp xếp theo Phổ biến, Mới nhất, Bán chạy
	// -> ghi đè object queryConfig: + thuộc tính sort_by
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
	// -> ghi đè object queryConfig: + thuộc tính sort_by (lấy từ sortBy trong "src/constants") thành sortBy.price (object sortBy trong constants)
	//                                + thuộc tính order (lấy từ order trong "src/constants")
	const handleOverrideSortByOrderUrl: (orderValue: Exclude<ProductListQueryParams["order"], undefined>) => void = (
		orderValue: Exclude<ProductListQueryParams["order"], undefined>,
	) => {
		// Bắn khối url lên thanh url -> thu vào object queryConfig -> call API get List
		// asc = sắp xếp từ thấp -> cao
		// desc = sắp xếp từ cao -> thấp
		navigate({
			pathname: paths.defaultPath,
			search: createSearchParams({
				// Tiến hành ghi đè giá trị mới của thuộc tính sort_by trong object queryConfig bằng giá trị sortBy.price được truyền vào
				...queryConfig,
				sort_by: sortBy.price,
				order: orderValue,
				// chuyển từ URLSearchParams sang string để phù hợp với giá trị mong muốn của thuộc tính search
			}).toString(),
		});
	};

	// Hàm submitForm filter theo khoảng giá
	const onSubmit = handleSubmit(
		// callback được gọi khi submit form hợp lệ với Schema
		(filterFormData) => {
			// filterFormData.priceMax?.ref.focus();
			navigate({
				pathname: paths.defaultPath,
				search: createSearchParams({
					// thay đổi path url -> queryConfig thay đổi -> component ProductList re-render và cập nhật lại queryConfig -> truyền xuống các component con
					...queryConfig,
					price_min: filterFormData.priceMin,
					price_max: filterFormData.priceMax,
				}).toString(),
			});
		},
	);

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
									// Muốn filter theo category -> ghi đè thuộc tính catergory trong object queryConfig bằng category id
									// Nhắc lại về nguyên lý hoạt động chỗ này: khi click -> bắn đoạn url có dạng pathname?[Lấy các cặp key/value trong object nhận vào và trả về các cặp
									// queryParams và giá trị của chúng.
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
								// form control nhận diện cấu trúc form thông qua generic type truyền vào useForm, cụ thể ở đây là FilterPriceFormData
								control={control}
								// name phải khớp với cấu trúc của type được truyền vào Generic Parameter của useForm, ở đây là FilterPriceFormData
								name='priceMin'
								render={({ field }) => (
									<InputNumber
										classNameInput={
											"capitalize h-full bg-[#fff] border border-[rgba(0,0,0,.26)] shadow-slate-600 rounded-sm pl-2 py-[15px] text-xs outline-none lg:ml-[12px] lowMobile:ml-0"
										}
										type='text'
										placeholder={t("aside filter.min")}
										// 2 cách viết tương đương
										// onChange={field.onChange}
										{...field}
										onChange={(event: any) => {
											// khi tiếp tục nhập vào priceMin -> trigger đến priceMax -> validate đến priceMax
											// -> validate sang priceMax mục đích để tránh bug, khi focus vào thẻ input này thì thẻ input còn lại bị bỏ validate -> có thể hết error nhưng ko được
											// ghi nhận
											field.onChange(event);
											trigger("priceMax");
										}}
										// value={field.value}
										// ref={field.ref}
										// -> làm tương tự với thanh InputNumber bên dưới
										// ta có thể trình bày ngắn gọn hơn : value = {field.value} ref={field.ref}
										// -> ghi ngắn gọn lại thành {...field}
										// value={String(queryConfig.price_min)}
									/>
								)}
							/>
							<div className='h-[0.5px] w-3 bg-[#bdbdbd]'></div>
							<Controller
								// form control nhận diện cấu trúc form thông qua generic type truyền vào useForm, cụ thể ở đây là FilterPriceFormData
								control={control}
								// name phải khớp với cấu trúc của type được truyền vào Generic Parameter của useForm, ở đây là FilterPriceFormData
								name='priceMax'
								render={({ field }) => (
									<InputNumber
										classNameInput={
											"capitalize h-full bg-[#fff] border border-[rgba(0,0,0,.26)] shadow-slate-600 rounded-sm pl-2 py-[15px] text-xs outline-none"
										}
										type={"text"}
										placeholder={t("aside filter.max")}
										// onChange = field.onChange tuy nhiên onChange ta đã override ở bên dưới
										{...field}
										// Với cách làm này: khi ta truyền value = {field.value} và onchange = [tự định nghĩa]
										// -> hoạt động đúng, tức là : không thể nhập text thường, bắt buộc nhập number
										// -> tuy nhiên khi ta không truyền onChange và Value -> Thẻ input không hoạt đỘng
										// -> handle vấn đề: không cần truyền value và onchange nhưng thẻ inpuit vẫn hoạt động đúng bằng cáhc tạo local State trong Component Input
										onChange={(event: any) => {
											field.onChange(event);
											trigger("priceMin");
										}}
										// value={field.value}
										// ref={field.ref}
										// value={String(queryConfig.price_min)}
									/>
								)}
								// -> giờ toàn bộ giá trị nhập vào thanh Input đều được lưu vào biến valueForm
							/>
						</div>
						<div className='flex justify-between items-center w-full basis-[45%] text-[11px] text-[#EE4D2D]'>
							<span className='text-center text-sm mt-2 min-h-[20px'>{errors ? errors.priceMin?.message : ""}</span>
						</div>
					</div>
					<div className='h-[0.5px] w-3 lowMobile:hidden'></div>
					<button
						className='flex-1 max-h-[46px] uppercase text-white bg-[#ee4d2d] rounded-sm lowMobile:py-2'
						type='submit'
					>
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
			<button
				className='hidden lg:block py-4 w-[80%] uppercase text-white bg-[#ee4d2d] rounded-sm mb-9'
				onClick={handleRemoveAllFilterParams}
			>
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
						// hoverTargetClassName = className của item quản lý popover
						// popoverContent = item chứa nội dung Popover
						popoverContent={
							<div className='popoverContentLanguagesContainerStyle z-[1000]'>
								<div className='flex flex-col'>
									{/* PopoverOption = các item con nằm trong Popover, thường là các action tùy chọn, thông tin loại sản phẩm trong giỏ hàng */}
									<PopoverOption
										// PopoverOption gồm có 2 thành phần: 1 thẻ cha (button, Link, a) bao quanh 1 thẻ con (span)
										// containerClassName = className của thẻ cha
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
						// className styles cho arrow: ta truyền styles phần căn chỉnh vị trí
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
