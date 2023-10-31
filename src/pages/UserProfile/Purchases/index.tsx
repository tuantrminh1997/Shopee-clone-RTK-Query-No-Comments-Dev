import purchaseListEmtyImgage from "src/assets/purchase-list-empty-background.png";
import { createSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { purchaseStatus, paths } from "src/constants";
import { useQueryParams } from "src/hooks";
import { SuccessResponseApi, PurchaseSuccessResponse, PurchaseListStatus, ExtendPurchaseSuccessResponse, RootState } from "src/types";
import { useGetPurchaseListQuery } from "src/sliceApis/cartSliceApi";
import { Button, PurchaseItem } from "src/components";

export default function Purchases() {
	const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
	const { allPurschases } = purchaseStatus;
	const { purchases } = paths;
	const queryParams = useQueryParams();
	const purchaseListStatus = queryParams.status || allPurschases;

	const { data: purchaseListQueryData } = useGetPurchaseListQuery(
		{ status: purchaseListStatus as PurchaseListStatus },
		{
			skip: !isLoggedIn,
		},
	);

	const purchaseList = useMemo(() => {
		if (purchaseListQueryData) {
			return (purchaseListQueryData as SuccessResponseApi<PurchaseSuccessResponse[]>).data;
		}
	}, [purchaseListQueryData]);

	const hasPurchaseItems: boolean | undefined = useMemo(
		() => purchaseList && purchaseList.length > 0,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[purchaseList?.length as number],
	);

	const { t } = useTranslation("user");

	const purchaseTabs = [
		{ status: purchaseStatus.allPurschases, title: t("purchaseTopTitle.all") },
		{ status: purchaseStatus.waitingForShop, title: t("purchaseTopTitle.to pay") },
		{ status: purchaseStatus.gettingFromShop, title: t("purchaseTopTitle.to ship") },
		{ status: purchaseStatus.purchaseDelivering, title: t("purchaseTopTitle.to receive") },
		{ status: purchaseStatus.purchaseDelivered, title: t("purchaseTopTitle.completed") },
		{ status: purchaseStatus.purchaseCanceled, title: t("purchaseTopTitle.cancelled") },
	] as const;

	return (
		<div className='flex flex-col justify-between max-w-[993px] rounded-sm h-full'>
			<Helmet>
				<title>Danh sách đơn mua | Shopee clone</title>
				<meta name='description' content='Chức năng theo dõi danh sách đơn mua - Dự án Shopee clone' />
			</Helmet>
			<div className='flex bg-white mb-6 myProfileBoxShadow'>
				{purchaseTabs.map((purchaseTab) => {
					const { status, title } = purchaseTab;
					const isActive = purchaseListStatus == String(status);
					return (
						<Button
							key={status}
							to={{
								pathname: purchases,
								search: createSearchParams({ status: String(status) }).toString(),
							}}
							className={`cursor-pointer py-4 basis-[calc(100%/6)] text-center border-b-2 hover:text-[#ee4d2d] ${
								isActive ? "border-[#ee4d2d] text-[#ee4d2d]" : "border-[#rgba(0,0,0,.09)]"
							} capitalize`}
						>
							{title}
						</Button>
					);
				})}
			</div>
			<div className={`flex rounded-sm bg-white purchaseListContentBoxShadow w-full py-0 ${!hasPurchaseItems ? "min-w-[993px] min-h-[740px]" : ""}`}>
				{(!hasPurchaseItems as boolean) && (
					<div className='flex flex-col items-center m-auto'>
						<img src={purchaseListEmtyImgage} alt='purchaseListEmtyImgage' className='w-[100px] h-[100px]' />
						<p className='text-lg text-[#000000cc] mt-5'>{t("content.no orders yet")}</p>
					</div>
				)}
				{(hasPurchaseItems as boolean) && (
					<div className='flex flex-col w-[1200px] xl:w-screen'>
						{purchaseList?.map((purchaseItem, purchaseItemIndex) => {
							const purchaseItemBuyCount = purchaseList?.find((_, index) => index === purchaseItemIndex)?.buy_count;
							return (
								<PurchaseItem
									key={purchaseItemIndex}
									extendPurchaseItem={purchaseItem as ExtendPurchaseSuccessResponse}
									extendPurchaseItemIndex={purchaseItemIndex}
									purchaseItemBuyCount={purchaseItemBuyCount as number}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
