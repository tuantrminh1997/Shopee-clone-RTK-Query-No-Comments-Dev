// react hooks:
import { useState } from "react";
// types
import { ProductItemQuantityControllerPropsType } from "src/types";
//icons:
import { MinusIcon, PlusIcon } from "src/icons";
// utils:
import { formatCurrency } from "src/utils";
// components
import { InputNumber } from "src/components";

export default function ProductItemQuantityController({
	maxQuantityAvailable,
	onIncreaseQuantity,
	onDecreaseQuantity,
	onTypeQuantity,
	value,
	classNameContainer = "mb-8",
	classNameInnerDiv = "mr-5",
	// Prop handle chức năng: khi nhập tay quantity -> click chuột ra vùng ngoài -> tiến hành call API để điều chỉnh quantity
	onFocusOut,
	itemNameId, // ?
	piecesAvailableTitlte, // ?
	quantityControllerTitle, // ?
}: ProductItemQuantityControllerPropsType) {
	// hooks:
	// nếu không truyền props value -> localValue lấy = 1
	const [localValue, setLocalValue] = useState<number>(Number(value) || 1);
	const handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Mặc định prop onchange của component InputNumber chỉ hoạt động khi người dùng nhập số
		// -> không cần check
		let _value = Number(event.target.value);
		// điều kiện 1: khi cố tình nhập hoặc tăng quá số lượng cho phép
		if (maxQuantityAvailable && _value > maxQuantityAvailable) {
			_value = maxQuantityAvailable;
			// điều kiện 2: khi cố tình nhập hoặc giảm quá số lượng cho phép
		} else if (_value < 1) {
			_value = 1;
		}
		// Nếu có truyền onTypeQuantity -> gọi onTypeQuantity và truyền giá trị _value vào
		onTypeQuantity && onTypeQuantity(_value);
		// Nếu không truyền onTypeQuantity -> sử dụng setLocalState
		setLocalValue(_value);
	};

	// method handle chức năng tăng/giảm quantity
	const handleDecrease: () => void = () => {
		// Nếu cố tình không truyền value -> lấy theo localState
		let _value = (Number(value) || localValue) - 1;
		if (_value < 1) {
			_value = 1;
		}
		onDecreaseQuantity && onDecreaseQuantity(_value);
		setLocalValue(_value);
	};
	const handleIncrease: () => void = () => {
		// Nếu cố tình không truyền value -> lấy theo localState
		let _value = (Number(value) || localValue) + 1;
		// -> sự kiện onClick -> _value = lấy từ state truyền vào hoặc từ localState + 1
		if (maxQuantityAvailable && _value > maxQuantityAvailable) {
			_value = maxQuantityAvailable;
		}
		// Nếu có truyền onIncreaseQuantity
		onIncreaseQuantity && onIncreaseQuantity(_value);
		// Nếu không truyền onTypeQuantity -> sử dụng setLocalState
		setLocalValue(_value);
	};

	// method quản lý chức năng focus Out -> call API điều chỉnh quantity
	const handleFocusOut: (event: React.FocusEvent<HTMLInputElement, Element>) => void = (event: React.FocusEvent<HTMLInputElement, Element>) => {
		onFocusOut && onFocusOut(Number(event.target.value));
	};

	return (
		<div className={`flex items-center ${classNameContainer}`}>
			{itemNameId !== undefined && quantityControllerTitle && (
				<span className='min-w-[110px] text-sm text-[#757575] capitalize'>{quantityControllerTitle}</span>
			)}
			<div className='flex lowMobile:flex-col lowMobile:items-start'>
				<div className={`flex ${classNameInnerDiv}`}>
					<button className='flex px-2 py-1 border border-gray rounded-sm' onClick={handleDecrease}>
						<MinusIcon className='m-auto' />
					</button>
					<InputNumber
						className={"w-[60px] py-1 border border-gray outline-none text-center"}
						classNameInput='text-red-800'
						type='text'
						value={value || localValue}
						onChange={handleChangeInput as (event: React.ChangeEvent<HTMLInputElement>) => void}
						onBlur={handleFocusOut as (event: React.FocusEvent<HTMLInputElement, Element>) => void}
					/>
					<button className='flex px-2 py-1 border border-gray rounded-sm' onClick={handleIncrease as () => void}>
						<PlusIcon className='m-auto' />
					</button>
				</div>
				{itemNameId && piecesAvailableTitlte && (
					<div className='flex items-center justify-start text-sm text-[#757575] lowMobile:mt-2'>
						<span>{formatCurrency(maxQuantityAvailable as number)}</span>
						<span className='ml-1'>{piecesAvailableTitlte}</span>
					</div>
				)}
			</div>
		</div>
	);
}
