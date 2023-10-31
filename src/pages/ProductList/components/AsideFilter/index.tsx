/* eslint-disable @typescript-eslint/no-explicit-any */
// clasName:
import classNames from "classnames";
// react-router-dom
import { createSearchParams, useNavigate } from "react-router-dom";
// lodash:
import omit from "lodash/omit";
// react hook form
import { useForm, Controller } from "react-hook-form";
// yupResolver
import { yupResolver } from "@hookform/resolvers/yup";
// icons:
import { CategoryListIcon, FilterIcon, RightArrowIcon } from "src/icons";
// types
import { AsideFilterPropsType, FilterPriceFormData } from "src/types";
// constants:
import { paths } from "src/constants";
// Sử dụng schema filter đã định nghĩa để Validate form khi nhập khoảng giá:
import { filterPriceSchema } from "src/utils";
// react i18n:
import { useTranslation } from "react-i18next";
// components:
import { Button, InputNumber, RatingStarsFilter } from "src/components";

export default function AsideFilter({ categoriesData, queryConfig }: AsideFilterPropsType) {
	// react i18n
	// truyền đúng namespace vào useTranslation
	const { t } = useTranslation("productList");

	// constants:
	const { category } = queryConfig;
	// navigate
	const navigate = useNavigate();

	const {
		// control -> 1 sự thay thế cho register -> đặt 1 component Input vào tầm theo dõi, để có thể validate, trigger, handle error
		control,
		handleSubmit,
		reset: resetFilterForm,
		// errors bắt đƯợc lỗi khi vi phạm rule trong schema
		// -> tóm lại ta sử dụng errors tại đây, không sử dụng error trong callback thứ 2 của handleSubmit -> toàn bộ errors do vi phạm schema sẽ lưu hết vào đây
		formState: { errors },
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

	// Hàm submitForm
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

	return (
		<div className='flex flex-col mr-5 mb-5 min-h-[200px] w-48 flex-none lg:hidden'>
			<Button
				// handle thêm chỗ này:
				// -> khi ấn vào tấT cả danh mục -> quay về url / và xoá query params category
				// -> render toàn bộ ProductList và giữ nguyên phần sort
				// -> Sử dụng thẻ Link: tái sử dụng component Button và truyền prop to -> biến thành thẻ Link, sử dụng omit từ lodash để ngắt bỏ thuộc tính category trong object queryConfig
				childrenClassName={"flex items-center "}
				to={{
					// -> khi ấn vào tấT cả danh mục -> quay về url / và xoá query params category
					pathname: paths.defaultPath,
					search: createSearchParams(
						omit(
							{
								...queryConfig,
							},
							["category"],
						),
					).toString(),
				}}
				className={classNames(
					"flex border-b border-[rgba(0,0,0,.05)] w-full items-center justify-items-start min-h-[52px] mb-[10px] cursor-pointer",
					{
						// mặc định khi chưa có category -> active tất cả danh mục
						"text-[#EE4D2D]": !category,
					},
				)}
			>
				<CategoryListIcon fill={!category ? "#EE4D2D" : "black"} className='mr-[10px]' />
				<span className='text-base font-bold capitalize'>{t("aside filter.all categories")}</span>
			</Button>
			{/* Filter theo Categories */}
			<div className='text-sm'>
				{categoriesData?.map((categoryItem) => {
					const isActive = category === categoryItem._id;
					return (
						<Button
							childrenClassName={"flex items-center "}
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
							className={classNames("py-2 pl-3 pr-[10px] cursor-pointer", {
								"text-[#EE4D2D]": isActive,
							})}
						>
							<RightArrowIcon fill={isActive ? "#EE4D2D" : "none"} />
							<span className='ml-2 capitalize'>{categoryItem.name}</span>
						</Button>
					);
				})}
			</div>
			<div className='flex border-b border-[rgba(0,0,0,.05)] w-full items-center justify-items-start min-h-[52px] mb-[10px]'>
				<FilterIcon className='mr-[10px]' />
				<span className='text-base font-bold capitalize'>{t("aside filter.filter search")}</span>
			</div>
			{/* Vùng filter theo khoảng giá */}
			<form className='flex flex-col border-b border-[rgba(0,0,0,.05)] py-5 w-full' onSubmit={onSubmit}>
				<span className='text-sm font-medium mb-[10px] capitalize'>{t("aside filter.price range")}</span>
				<div className='flex justify-between flex-col mt-5 mb-[5px] items-center w-full h-[70px]'>
					<div className='flex items-center justify-between w-full basis-[45%]'>
						<Controller
							// form control nhận diện cấu trúc form thông qua generic type truyền vào useForm, cụ thể ở đây là FilterPriceFormData
							control={control}
							// name phải khớp với cấu trúc của type được truyền vào Generic Parameter của useForm, ở đây là FilterPriceFormData
							name='priceMin'
							render={({ field }) => (
								<InputNumber
									classNameInput={
										"w-20 h-8 bg-[#fff] border border-[rgba(0,0,0,.26)] shadow-slate-600 rounded-sm  pl-1 pr-[2px] py-[2px] text-xs outline-none uppercase"
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
										"w-20 h-8 bg-[#fff] border border-[rgba(0,0,0,.26)] shadow-slate-600 rounded-sm pl-1 pr-[2px] py-[2px] text-xs outline-none uppercase"
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
						<span className='text-center'>{errors ? errors.priceMin?.message : ""}</span>
					</div>
				</div>
				<button
					className=' flex justify-center items-center py-[6px] uppercase text-white bg-[#ee4d2d] rounded-sm'
					type='submit'
				>
					{t("aside filter.apply")}
				</button>
			</form>
			{/* Vùng Filer theo Rating Star */}
			<div className='flex flex-col border-b border-[rgba(0,0,0,.05)] py-5 w-full'>
				<span className='text-sm font-medium mb-[10px] capitalize'>{t("aside filter.rating")}</span>
				{/* <RatingStar /> */}
				<RatingStarsFilter t={t("aside filter.up") as string} queryConfig={queryConfig} />
			</div>
			{/* Button Xoá tất cả */}
			<button
				className='mt-[20px] flex justify-center items-center py-[6px] uppercase text-white bg-[#ee4d2d] rounded-sm'
				onClick={handleRemoveAllFilterParams}
			>
				{t("aside filter.clear all")}
			</button>
		</div>
	);
}
