// react hooks:
import { useMemo, useState } from "react";
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
	onFocusOut,
	itemNameId, // ?
	piecesAvailableTitlte, // ?
	quantityControllerTitle, // ?
}: ProductItemQuantityControllerPropsType) {
	const [localValue, setLocalValue] = useState<number>(Number(value) || 1);
	const handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
		let _value = Number(event.target.value);
		if (maxQuantityAvailable && _value > maxQuantityAvailable) {
			_value = maxQuantityAvailable;
		} else if (_value < 1) {
			_value = 1;
		}
		onTypeQuantity && onTypeQuantity(_value);
		setLocalValue(_value);
	};

	const handleDecrease: () => void = () => {
		let _value = (Number(value) || localValue) - 1;
		if (_value < 1) {
			_value = 1;
		}
		onDecreaseQuantity && onDecreaseQuantity(_value);
		setLocalValue(_value);
	};
	const handleIncrease: () => void = () => {
		let _value = (Number(value) || localValue) + 1;
		if (maxQuantityAvailable && _value > maxQuantityAvailable) {
			_value = maxQuantityAvailable;
		}
		onIncreaseQuantity && onIncreaseQuantity(_value);
		setLocalValue(_value);
	};

	const handleFocusOut: (event: React.FocusEvent<HTMLInputElement, Element>) => void = (event: React.FocusEvent<HTMLInputElement, Element>) => {
		onFocusOut && onFocusOut(Number(event.target.value));
	};

	const isDisableDecreaseButton = useMemo(() => {
		if (value === 1) return true;
		return false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, maxQuantityAvailable]);
	const isDisableIncreaseButton = useMemo(() => {
		if (value === maxQuantityAvailable) return true;
		return false;
	}, [value, maxQuantityAvailable]);

	return (
		<div className={`flex items-center ${classNameContainer}`}>
			{itemNameId !== undefined && quantityControllerTitle && (
				<span className='min-w-[110px] text-sm text-[#757575] capitalize'>{quantityControllerTitle}</span>
			)}
			<div className='flex lowMobile:flex-col lowMobile:items-start'>
				<div className={`flex ${classNameInnerDiv}`}>
					<button
						className={`flex px-2 py-1 border border-gray rounded-sm ${isDisableDecreaseButton ? "cursor-not-allowed" : ""}`}
						onClick={handleDecrease}
						disabled={isDisableDecreaseButton}
					>
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
					<button
						className={`flex px-2 py-1 border border-gray rounded-sm ${isDisableIncreaseButton ? "cursor-not-allowed" : ""}`}
						onClick={handleIncrease as () => void}
						disabled={isDisableIncreaseButton}
					>
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
