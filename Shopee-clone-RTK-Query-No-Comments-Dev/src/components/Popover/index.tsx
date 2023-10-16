// imports;
// react:
import { useState, useRef } from "react";
// floating - UI:
import { useFloating, FloatingPortal, arrow, offset } from "@floating-ui/react";
import { shift } from "@floating-ui/dom";
// framer-motion:
import { AnimatePresence, motion } from "framer-motion";
// types:
// Chú ý: để tăng tính custome cho Component tái sử dụng, ta có thể tạo 1 props quản lý việc chuyển đổi giữa 1 vài thẻ html
import { PopoverPropsType } from "src/types";

// Trước mắt component Header dùng cho MainLayout -> Layout sau khi đăng nhập thành công
export default function Popover({
	// Prop chứa item quản lý Popover
	hoverTarget,
	// Prop chứa className của item quản lý Popover
	hoverTargetclassName,
	// Prop chứa className của mũi tên Popover
	popoverArrowClassName,
	// Item chứa Nội dung chính của popover
	popoverContent,
	// prop quản lý giá trị chuyển đổi qua lại giữa 1 vài thẻ html khác nhau
	as: Element = "div",
	// prop quản lý giá trị của isOpenPopover
	initialOpenPopover,
	// Prop offset -> dịch chuyển khối Popover xuống thêm ? px
	offsetValue = -1,
	// Prop quy định vị trí bị dồn về của Popover, bottom-end = dồn về dưới cùng, góc bên phải.
	placementValue = "bottom-end", // State quản lý tắt/mở popover truyền từ ngoài vào
	// Prop quản lý Popover dùng cho component nào ? giỏ hàng hay My Account Icon
	isCartComponent,
}: PopoverPropsType) {
	// handle mũi tên của tooltip - mũi tên nối giữa khối tooltip với item quản lý tooltip (Xem tại docs floating ui -> mục Arrow)
	const arrowRef = useRef(null);

	// object trả về của useFloating có property: reference -> truyền vào attribute ref của item mà khi hover vào đó sẽ showw tooltip
	const [isOpenPopover, setIsOpenPopover] = useState<boolean>(initialOpenPopover || false);
	const { refs, middlewareData, x, y, strategy } = useFloating({
		open: isOpenPopover,
		onOpenChange: setIsOpenPopover,
		middleware: [
			arrow({
				element: arrowRef,
			}),
			// dịch cả khối tooltip xuống dưới 1 px
			offset(offsetValue),
			// handle chức năng dịch chuyển khối Popover theo hướng không bị màn hình che lấp
			shift(),
		],
		placement: placementValue,
	});

	// method quản lý chức năng ẩn/hiện Popover
	const handleShowPopover = () => {
		setIsOpenPopover(true);
	};

	const handleHidePopover = () => {
		setIsOpenPopover(false);
	};

	return (
		<Element className={hoverTargetclassName} ref={refs.setReference} onMouseEnter={handleShowPopover} onMouseLeave={handleHidePopover}>
			{hoverTarget}
			<FloatingPortal>
				<AnimatePresence>
					{isOpenPopover && (
						<motion.div
							className='relative z-[1000]'
							ref={refs.setFloating}
							style={{
								position: strategy,
								left: x ?? 0,
								top: y ?? 0,
								width: "max-content",
								// vị trí của toạ độ gốc animation
								transformOrigin: `${middlewareData.arrow?.x}px top`,
							}}
							// Animation cho FramerMotion
							initial={{ opacity: 0, transform: "scale(0)" }}
							animate={{ opacity: 1, transform: "scale(1)" }}
							exit={{ opacity: 0, transform: "scale(0)" }}
							transition={{ duration: 0.2 }}
						>
							{/* Item Arrow cho tooltip */}
							<span
								ref={arrowRef}
								className={`border-x-transparent border-t-transparent border-b-white border-[11px] ${popoverArrowClassName} xl:hidden`}
								style={{
									left: middlewareData.arrow?.x,
									top: middlewareData.arrow?.y,
									zIndex: 1,
								}}
							/>
							{popoverContent}
							<button
								onClick={handleHidePopover}
								className={`hidden xl:block xl:absolute rounded-sm bg-[#ee4d2d] w-[25%] h-[25px] text-white ${
									isCartComponent ? "top-[10px] right-[10px]" : "bottom-[10px] right-[10px]"
								} `}
							>
								x
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</FloatingPortal>
		</Element>
	);
}
