import type { Placement } from "@floating-ui/react";

interface PopoverPropsType {
	// item quản lý Popover, khi hover vào sẽ hiển thị popover
	hoverTarget?: React.ReactNode;
	hoverTargetclassName?: string;
	popoverArrowClassName?: string;
	// Item chứa Nội dung chính của popover
	popoverContent: React.ReactNode;
	// prop quản lý giá trị chuyển đổi qua lại giữa 1 vài thẻ html khác nhau
	as?: React.ElementType;
	// prop quản lý giá trị của isOpenPopover
	initialOpenPopover?: boolean;
	// giá trị offset -> dịch chuyển khối Popover xuống thêm ? px
	offsetValue?: number;
	// giá trị quy định vị trí bị dồn về của Popover, bottom-end = dồn về dưới cùng, góc bên phải.
	placementValue?: Placement;
	isCartComponent?: boolean;
}
export default PopoverPropsType;
