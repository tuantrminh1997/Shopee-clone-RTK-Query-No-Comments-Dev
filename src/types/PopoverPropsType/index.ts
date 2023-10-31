import type { Placement } from "@floating-ui/react";

interface PopoverPropsType {
	hoverTarget?: React.ReactNode;
	hoverTargetclassName?: string;
	popoverArrowClassName?: string;
	popoverContent: React.ReactNode;
	as?: React.ElementType;
	initialOpenPopover?: boolean;
	offsetValue?: number;
	placementValue?: Placement;
	isCartComponent?: boolean;
}
export default PopoverPropsType;
