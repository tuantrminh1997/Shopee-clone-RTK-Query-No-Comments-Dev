// i18n
import { useTranslation } from "react-i18next";
// types
import { SettlementAreaPropsType } from "src/types";
// utils:
import { formatCurrency } from "src/utils";

export default function SettlementArea({
	isCheckFull,
	extendPurchaseList,
	handleCheckFull,
	handleDeletePurchaseItems,
	checkedPurchaseItemsCount,
	getTotalCheckedPurchaseItemsPrice,
	getTotalCheckedPurchaseItemsSavingPrice,
	handleBuyCheckedPurchaseItems,
	buyCheckedPurchaseItemsIsLoading,
}: SettlementAreaPropsType) {
	const { t } = useTranslation("cart");
	return (
		<div className='flex items-center rounded-md bg-white cartPageBoxShadow1 min-h-[100px] mb-3 sticky bottom-0 shadow-inner lg:mx-3 sm:flex-col sm:items-start sm:pt-2 sm:pl-3'>
			<div className='flex items-center flex-1'>
				<div
					className='flex justify-start items-center text-base text-[#000000CC] mr-3 cursor-pointer'
					aria-hidden='true'
					onClick={handleCheckFull}
				>
					<div className='w-[58px] h-full flex pl-3'>
						<input type='checkbox' className='m-auto' checked={isCheckFull} />
					</div>
					<span className='w-32 capitalize'>
						{t("cartFooter.select all")} ({extendPurchaseList.length})
					</span>
				</div>
				<span className='cursor-pointer inline-block capitalize' aria-hidden='true' onClick={handleDeletePurchaseItems}>
					{t("cartFooter.delete")}
				</span>
			</div>
			<div className='flex flex-[2] items-center justify-end text-sm text-[#888888] pr-10 sm:w-full sm:justify-start sm:pl-7'>
				<span className='flex flex-col items-end sm:mt-2'>
					<div className='flex justify-end items-center h-full flex-1 lowerMobile:flex-col lowerMobile:items-start'>
						<span className='flex lg:flex-col text-base text-[#222222] text-left mr-2 lowMobile:text-xs'>
							<p className='mr-[2px]'>{t("cartFooter.total")}</p>
							<p>
								({checkedPurchaseItemsCount} {t("cartFooter.item")})
							</p>
						</span>
						<div className='flex items-start text-2xl lowMobile:text-lg text-[#ee4d2d]'>
							<span className='text-base underline mr-1'>đ</span>
							<span>{formatCurrency(getTotalCheckedPurchaseItemsPrice() as number)}</span>
						</div>
					</div>
					{getTotalCheckedPurchaseItemsSavingPrice() && (
						<div className='flex items-center text-sm flex-1'>
							<p className='text-[#000000CC] flex-1 lowerMobile:text-xs'>{t("cartFooter.saved")}</p>
							<div className='flex items-start text-[#ee4d2d] min-w-[80px] justify-end pl-2'>
								<span className='text-[10px] underline mr-1 leading-4'>đ</span>
								<span>{formatCurrency(getTotalCheckedPurchaseItemsSavingPrice() as number)}</span>
							</div>
						</div>
					)}
				</span>
				<button
					className='basis-[30%] h-10 bg-[#ee4d2d] text-sm text-white rounded-sm ml-4 hover:bg-[#f05d40] lowerMobile:basis-[33%] capitalize'
					onClick={handleBuyCheckedPurchaseItems}
					disabled={buyCheckedPurchaseItemsIsLoading}
				>
					{t("cartFooter.check out")}
				</button>
			</div>
		</div>
	);
}
