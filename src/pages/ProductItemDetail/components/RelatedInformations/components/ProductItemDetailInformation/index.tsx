// Thư viện DOM Purify: loại bỏ mã JS không rõ nguồn gốc khi cố tình render chuỗi HTML= dangerousSetInnerHTML
import DOMPurify from "dompurify";
// react hooks
import { useState } from "react";
// types
import { ProductItemDetailInformationPropsType } from "src/types";
// icons
import { ArrowDownIcon } from "src/icons";

export default function ProductItemDetailInformation({
	productItemDescription,
	productDescription,
	showMoreTitle,
	collapseTitle,
}: ProductItemDetailInformationPropsType) {
	const [isShowFullProductItemDetailInfor, setIsShowFullProductItemDetailInfor] = useState<boolean>(false);

	return (
		<div
			className={`flex flex-col justify-start w-full bg-white rounded-sm p-[30px] lg:pb-0 ${
				isShowFullProductItemDetailInfor ? "lg:max-h-[100%]" : "lg:max-h-[500px]"
			}`}
		>
			<div className='flex bg-[rgba(0,0,0,.02)]'>
				<span className='text-lg text-[rgba(0,0,0,.87)] p-[14px] font-normal capitalize'>{productDescription}</span>
			</div>
			<div className='flex flex-col flex-wrap justify-start my-[30px] px-[14px] lg:mb-0 lg:overflow-hidden lg:text-ellipsis'>
				{/* Việc cố tình render 1 chuỗi HTML theo kiểu render JSX thì React sẽ không hiểu, đây là cơ chế tự vệ của chuỗi JSX để chống lại kiểu tấn công XSS */}
				{/* 
          Ta sẽ cố tình render chuỗi HTML này bằng cách đặt vào , ta sẽ thêm cơ chế tự về bằng cách loại bỏ đoạn code JavaScript độc hại có thể bị lẫn lộn
          vào chuỗi HTML mà ta đã cố tình render bất chấp -> sử dụng thư viện DOMPurify
        */}
				<div
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(productItemDescription),
					}}
					className='h-full'
				/>
			</div>
			<div
				className='hidden lg:flex text-[#ee4d2d] items-center justify-center cursor-pointer min-w-full border-t mt-4 min-h-[70px]'
				onClick={() => setIsShowFullProductItemDetailInfor(!isShowFullProductItemDetailInfor)}
				aria-hidden='true'
			>
				{!isShowFullProductItemDetailInfor && (
					<>
						<p className='mr-2 capitalize'>{showMoreTitle}</p>
						<ArrowDownIcon />
					</>
				)}
				{isShowFullProductItemDetailInfor && (
					<>
						<p className='mr-2 capitalize'>{collapseTitle}</p>
						<ArrowDownIcon isRotate />
					</>
				)}
			</div>
		</div>
	);
}
