// react hooks:
import { useState, memo } from "react";
// types:
import { DateSelectionType, DateOfBirthSelectionPropsType } from "src/types";
// private components:
import { SetDate, SetMonth, SetYear } from "./components";

function DateOfBirthSelectionInner({ dateOfBirthSelectionFieldTitle, dateOfBirthValue, onChange, errorMessage }: DateOfBirthSelectionPropsType) {
	// 1 Component không cần truyền Props mà vẫn hoạt động được -> cần tạo local state
	const [date, setDate] = useState<DateSelectionType>({
		day: dateOfBirthValue?.getDate() || 1,
		month: Number(dateOfBirthValue?.getMonth()) + 1 || 1,
		year: dateOfBirthValue?.getFullYear() || 1990,
	});

	// Method quản lý chức năng lựa chọn ngày/tháng/năm sinh
	const handleChangeDateSelection: (value: number, name: string) => void = (value, name) => {
		const newDate = {
			...date,
			[name]: value,
		};
		setDate(newDate);
		onChange && onChange(new Date(newDate.year, newDate.month, newDate.day));
	};
	return (
		<div className='flex flex-wrap lowMobile:flex-col'>
			<div className='flex items-center justify-end basis-[33.33%] pb-[10px] xl:justify-start xl:basis-[8%] lg:min-w-[71px]'>
				<p className='text-xs text-[#555555CC]'>{dateOfBirthSelectionFieldTitle}</p>
			</div>
			<div className='flex justify-between basis-[66.66%] pl-5 pb-[10px] lowMobile:pl-0'>
				<SetDate handleChangeDateSelection={handleChangeDateSelection} day={dateOfBirthValue?.getDate() || date.day} />
				<SetMonth handleChangeDateSelection={handleChangeDateSelection} month={Number(dateOfBirthValue?.getMonth()) + 1 || date.month} />
				<SetYear handleChangeDateSelection={handleChangeDateSelection} year={dateOfBirthValue?.getFullYear() || date.year} />
			</div>
			<span className='pl-5 basis-[66.66%] text-sm text-[#ff424f] min-h-[40px]'>{errorMessage && errorMessage}</span>
		</div>
	);
}
const DateOfBirthSelection = memo(DateOfBirthSelectionInner);
export default DateOfBirthSelection;
