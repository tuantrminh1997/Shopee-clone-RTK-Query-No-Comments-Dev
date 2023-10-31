// imports:
// i18n
import { useTranslation } from "react-i18next";
// icons:
import { MagnifyingGlassIcon } from "src/icons";
import { SearchFormCartPropsType } from "src/types";

// Trước mắt component Header dùng cho MainLayout -> Layout sau khi đăng nhập thành công
export default function SearchForm({ handleSubmitForm, register, isHeaderForCartLayout }: SearchFormCartPropsType) {
	const { t } = useTranslation("header");
	return (
		<div
			className={`flex justify-between items-center gap-4 ${
				!isHeaderForCartLayout
					? "basis-[71.67%] pl-[10px] xl:pl-0 xl:basis-[60%] lg:basis-[40%] md:basis-[50%] lowMobile:ml-3"
					: "basis-[50%]"
			} xl:flex-1`}
		>
			{/* Logo Shopee -> tái sử dụng Component PopoverOption do có cấu trúc giống */}
			{/* Form Input tìm kiếm */}
			{/* Thuộc tính action là một trong những thuộc tính quan trọng của thẻ <form>, và nó xác định URL mà dữ liệu biểu mẫu sẽ được gửi đến khi người dùng nhấn nút gửi 
          (submit) trong biểu mẫu. */}
			<form className='w-full flex flex-col' onSubmit={handleSubmitForm}>
				<div
					className={`w-full bg-white rounded-sm p-1 flex basis-[50%] isHeaderForCartLayout ? "" : "headerInputFormBoxShadow"`}
				>
					<input
						type='text'
						className={`text-black px-3 py-2 flex-grow outline-none bg-transparent ${
							isHeaderForCartLayout ? "border border-[#ee4d2d]" : "border-none"
						}`}
						placeholder={t("header.search product name")}
						{...register("productListSearchForm")}
					/>
					<button
						className={`flex px-[15px] py-2 bg-[#fb5533] flex-shrink-0 ${isHeaderForCartLayout ? "min-w-[80px]" : ""}`}
					>
						<MagnifyingGlassIcon className='m-auto' />
					</button>
				</div>
			</form>
		</div>
	);
}
