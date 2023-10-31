/* eslint-disable @typescript-eslint/no-explicit-any */
// lodash
import range from "lodash/range";
// react hooks
import { memo, useRef, useState, useEffect } from "react";
// types:
import { SetDatePropsType } from "src/types";
// constants:
import { myAccountFormConstants } from "src/constants";
// icons
import { ArrowDownIcon } from "src/icons";

function SetYearInner({ handleChangeDateSelection, year }: SetDatePropsType) {
	const { maxYearSelection } = myAccountFormConstants;
	const divRef = useRef(null);
	const [toggleSelectYear, setToggleSelectYear] = useState<boolean>(false);

	useEffect(() => {
		// Thêm một sự kiện click toàn cục để kiểm tra sự kiện click ra ngoài
		const handleClickOutside = (event: any) => {
			// Lỗi "Property 'contains' does not exist on type 'false'" xuất hiện vì TypeScript đang hiểu sai kiểu dữ liệu của divRef.current. Trong trường hợp này, bạn có thể
			// giải quyết lỗi này bằng cách kiểm tra divRef.current trước khi sử dụng phương thức contains
			if (
				divRef.current &&
				typeof (divRef.current as HTMLElement).contains === "function" &&
				!(divRef.current as HTMLElement).contains(event.target)
			) {
				// Kiểm tra xem event.target không nằm trong phần tử divRef.current
				setToggleSelectYear(false);
			}
			// Trong đoạn mã trên, chúng ta đã thêm kiểm tra typeof divRef.current.contains === 'function' để đảm bảo rằng divRef.current là một phần tử DOM và có phương thức
			// contains. Điều này giúp tránh lỗi TypeScript và chạy mã mà không gặp vấn đề.
		};

		// Đăng ký sự kiện click toàn cục khi component được mount
		document.addEventListener("click", handleClickOutside);

		// Hủy đăng ký sự kiện khi component bị unmount
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div
			className={`flex justify-between relative py-[11px] items-center border basis-[32%] rounded-sm px-[15px] cursor-pointer hover:border-[#ee4d2d]
    ${toggleSelectYear ? "border-[#ee4d2d]" : "border-[rgba(0,0,0,.09)]"} lowMobile:min-w-[70px]`}
			ref={divRef}
			aria-hidden='true'
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			onClick={() => setToggleSelectYear(!toggleSelectYear)}
		>
			<p className='text-xs text-[#000000CC]'>{year}</p>
			<ArrowDownIcon isRotate={toggleSelectYear && true} />
			<div
				className={`absolute top-[110%] left-0 w-full max-h-[144px] flex flex-col bg-white shadow-2xl overflow-y-auto ${
					!toggleSelectYear && "hidden"
				}`}
			>
				{range(maxYearSelection, 1910).map((item) => (
					<span
						key={item}
						aria-hidden='true'
						className='px-[15px] py-[5px] text-sm text-[#000000CC] hover:text-[#ee4d2d]'
						onClick={() => handleChangeDateSelection(item, "year")}
					>
						{item}
					</span>
				))}
			</div>
		</div>
	);
}
const SetYear = memo(SetYearInner);
export default SetYear;
