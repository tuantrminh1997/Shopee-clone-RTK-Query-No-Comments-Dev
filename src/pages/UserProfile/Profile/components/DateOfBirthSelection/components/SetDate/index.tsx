// react hooks:
import { memo, useRef, useState, useEffect } from "react";
// lodash
import range from "lodash/range";
// types:
import { SetDatePropsType } from "src/types";
// icons
import { ArrowDownIcon } from "src/icons";

export default memo(function SetDate({ day, handleChangeDateSelection }: SetDatePropsType) {
	const divRef = useRef(null);
	const [toggleSelectDate, setToggleSelectDate] = useState<boolean>(false);

	useEffect(() => {
		// Thêm một sự kiện click toàn cục để kiểm tra sự kiện click ra ngoài
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const handleClickOutside = (event: any) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if (divRef.current && (!divRef.current as any).contains(event.target)) {
				// Kiểm tra xem event.target không nằm trong phần tử divRef.current
				setToggleSelectDate(false);
			}
		};

		// Đăng ký sự kiện click toàn cục khi component được mount
		document.addEventListener("click", handleClickOutside);

		// Hủy đăng ký sự kiện khi component bị unmount
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className={`flex justify-between relative py-[11px] items-center border basis-[32%] rounded-sm px-[15px] cursor-pointer hover:border-[#ee4d2d]
            ${toggleSelectDate ? "border-[#ee4d2d]" : "border-[rgba(0,0,0,.09)]"} lowMobile:min-w-[70px]`}
			ref={divRef}
			aria-hidden='true'
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			onClick={() => setToggleSelectDate(!toggleSelectDate)}
		>
			<p className='text-xs text-[#000000CC]'>{day}</p>
			<ArrowDownIcon isRotate={toggleSelectDate && true} />
			<div
				className={`absolute top-[110%] left-0 w-full max-h-[144px] flex flex-col bg-white shadow-2xl overflow-y-auto ${
					!toggleSelectDate && "hidden"
				}`}
			>
				{range(1, 32).map((item) => (
					<span
						key={item}
						aria-hidden='true'
						className='px-[15px] py-[5px] text-sm text-[#000000CC] hover:text-[#ee4d2d]'
						onClick={() => handleChangeDateSelection(item, "day")}
					>
						{item}
					</span>
				))}
			</div>
		</div>
	);
});
