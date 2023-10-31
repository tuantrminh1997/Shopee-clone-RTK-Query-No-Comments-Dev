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
		// Nhận được item = giá trị ngày/tháng/năm; name = "day", "month", "year"
		// -> tiến hành ghi đè vào object date của state local
		const newDate = {
			...date,
			[name]: value,
		};
		setDate(newDate);
		// Nếu nhận Prop onChange -> truyền giá trị Date vừa set ra ngoài phạm vi Component
		// -> gọi onChange với giá trị mới này, nó sẽ cập nhật giá trị của field.value trong Controller của React Hook Form. Và
		// sau đó, giá trị này sẽ được truyền ngược lại vào component DateOfBirthSelection thông qua prop dateOfBirthValue. Điều này
		// làm cho giá trị trong trường ngày/tháng/năm sinh luôn đồng bộ với sự lựa chọn của người dùng và ngược lại.
		onChange && onChange(new Date(newDate.year, newDate.month, newDate.day));
	};
	return (
		<div className='flex flex-wrap lowMobile:flex-col'>
			<div className='flex items-center justify-end basis-[33.33%] pb-[10px] xl:justify-start xl:basis-[8%] lg:min-w-[71px]'>
				<p className='text-xs text-[#555555CC]'>{dateOfBirthSelectionFieldTitle}</p>
			</div>
			<div className='flex justify-between basis-[66.66%] pl-5 pb-[10px] lowMobile:pl-0'>
				{/* 
          - Ta vẫn ưu tiên giá trị date từ bên ngoài truyền vào, chính là giá trị get từ API
        */}
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
{
	/* 
    - ta có ý tưởng chuyển toàn bộ vùng select ngày/tháng/năm sinh thành 1 component
    riêng biệt cho dễ handle:
    1. API hỗ trợ chỉ đúng 1 thuộc tính (1 trường trên DB): date_of_birth
    -> ta cần truyền dữ liệu ra/vào chô này gom chung vào 1 thuộc tính
    chứ ko thể chia riêng ra day/month/year, ..v....v....
    -> ta nên chuyển toàn bộ thành 1 component để khi truyền ra truyền vào có thể
    thống nhất thành 1 thuộc tính dữ liệu cụ thể.
    -> sử dụng Controller truyền toàn bộ DOB vào.
  */
}
