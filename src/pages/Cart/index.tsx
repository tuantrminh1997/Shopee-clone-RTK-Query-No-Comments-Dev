/* eslint-disable @typescript-eslint/no-explicit-any */
import emtyCartBackground from "src/assets/shopee-emty-cart-background.png";
import { useRef, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import keyBy from "lodash/keyBy";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	BuyProductsApiPropsType,
	ExtendPurchaseSuccessResponse,
	ProductItemApiType,
	PurchaseSuccessResponse,
	RootState,
	SuccessResponseApi,
} from "src/types";
import { purchaseStatus, paths } from "src/constants";
import {
	setPurchaseItemDisableStatusAction,
	setPurchaseItemQuantityOnTypeAction,
	updateExtendPurchaseListAction,
	setPurchaseItemCheckStatusAction,
	setAllPurchaseItemCheckStatusAction,
} from "src/slices/purchaseListSlice";
import { TitleArea, SettlementArea } from "./components";
import { PurchaseItem, Button } from "src/components";
import {
	useBuyCheckedPurchaseItemsMutation,
	useDeletePurchaseItemMutation,
	useGetPurchaseListQuery,
	useUpdateCartPurchaseMutation,
} from "src/sliceApis/cartSliceApi";

export default function Cart() {
	const extendPurchaseList: ExtendPurchaseSuccessResponse[] = useSelector((state: RootState) => state.purchaseList.extendPurchaseList);
	const isLoggedIn: boolean = useSelector((state: RootState) => state.app.isLoggedIn);
	const { inCart } = purchaseStatus;
	const { productList: productListUrl } = paths;
	const dispatch = useDispatch();
	const { data: purchaseListQueryData } = useGetPurchaseListQuery(
		{ status: inCart },
		{
			skip: !isLoggedIn,
		},
	);

	const purchaseList = useMemo(
		() =>
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(purchaseListQueryData as SuccessResponseApi<PurchaseSuccessResponse[]>)?.data,
		[purchaseListQueryData],
	);

	const checkedPurchaseItems = useMemo(() => extendPurchaseList.filter((purchaseItem) => purchaseItem.isCheck), [extendPurchaseList]);
	const checkedPurchaseItemsCount = useMemo(() => checkedPurchaseItems.length, [checkedPurchaseItems]);

	const location = useLocation();

	const purchaseProductItemDetailIdFromLocation = useMemo(() => location.state?.purchaseProductItemDetailId, [location]);

	useEffect(() => {
		if (purchaseList) {
			const extendPurchaseObject = keyBy(extendPurchaseList, "_id");
			const newPurchaseList =
				purchaseList.map((purchaseItem) => {
					const isBuyNowProductItemDetail = (purchaseProductItemDetailIdFromLocation as string | null) === (purchaseItem._id as string);
					return {
						...purchaseItem,
						isCheck: isBuyNowProductItemDetail || Boolean(extendPurchaseObject[purchaseItem._id]?.isCheck) || false,
						disabled: false,
					};
				}) || [];
			dispatch(updateExtendPurchaseListAction(newPurchaseList));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [purchaseList, purchaseProductItemDetailIdFromLocation, dispatch]);

	useEffect(() => {
		return () => {
			history.replaceState(null, "");
		};
	}, []);

	const handleCheck: (purchaseItemIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void =
		(purchaseItemIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
			const purchaseItemCheckStatus: boolean = event.target.checked;
			dispatch(setPurchaseItemCheckStatusAction({ purchaseItemIndex, purchaseItemCheckStatus }));
		};

	const isCheckFull: boolean = useMemo(() => extendPurchaseList.every((extendPurchaseItem) => extendPurchaseItem.isCheck), [extendPurchaseList]);

	const handleCheckFull: () => void = () => {
		const checkFullExtendPurchaseListItems = extendPurchaseList.map((extendPurchaseItem) => {
			const checkedPurchaseItem = { ...extendPurchaseItem, isCheck: !isCheckFull };
			return checkedPurchaseItem;
		});
		dispatch(setAllPurchaseItemCheckStatusAction(checkFullExtendPurchaseListItems));
	};

	const [updateCartPurchaseMutation] = useUpdateCartPurchaseMutation();

	const [buyCheckedPurchaseItemsMutation, { isLoading: buyCheckedPurchaseItemsIsLoading }] = useBuyCheckedPurchaseItemsMutation();

	const handleBuyCheckedPurchaseItems: () => void = async () => {
		if (checkedPurchaseItemsCount < 1) {
			toast.error("Vui lòng tích chọn các sản phẩm bạn muốn thành toán", {
				position: "top-right",
				autoClose: 2000,
			});
			return;
		}
		const checkedPurchaseItemsToServer: BuyProductsApiPropsType<ProductItemApiType> = checkedPurchaseItems.map((checkedPurchaseItem) => ({
			product_id: checkedPurchaseItem.product._id,
			buy_count: checkedPurchaseItem.buy_count,
		}));
		await buyCheckedPurchaseItemsMutation(checkedPurchaseItemsToServer)
			.unwrap()
			.then((data) => {
				const successMessage = data.message;
				toast.success(successMessage, {
					position: "top-center",
					autoClose: 2000,
				});
			});
	};

	const [deletePurchaseItemMutation] = useDeletePurchaseItemMutation();

	const handleUpdateQuantityPurchaseItem: (purchaseItemIndex: number, buyCountValue: number, enable: boolean) => void = async (
		purchaseItemIndex: number,
		buyCountValue: number,
		enable: boolean,
	) => {
		if (enable) {
			const purchaseItem = extendPurchaseList[purchaseItemIndex];
			dispatch(setPurchaseItemDisableStatusAction(purchaseItemIndex));
			const updatePurchaseItemBody = {
				product_id: purchaseItem.product._id,
				buy_count: buyCountValue,
			};
			await updateCartPurchaseMutation(updatePurchaseItemBody)
				.unwrap()
				.then((data) => {
					const successMessage = data.message;
					toast.success(successMessage, {
						position: "top-center",
						autoClose: 2000,
					});
				});
		}
	};

	const handleTypeQuantity: (purchaseItemIndex: number) => (value: number) => void = (purchaseItemIndex: number) => (value: number) => {
		dispatch(setPurchaseItemQuantityOnTypeAction({ purchaseItemIndex, buyCountValue: value }));
	};

	const previousDeletePurchaseItemIdRef = useRef<string | null>(null);

	const handleDeletePurchaseItem: (purchaseItemIndex: number) => () => void = (purchaseItemIndex: number) => async () => {
		const onDeletePurchaseItemId = (
			extendPurchaseList.find((_, extendPurchaseItemIndex: number) => extendPurchaseItemIndex === purchaseItemIndex) as ExtendPurchaseSuccessResponse
		)._id;
		if (onDeletePurchaseItemId === previousDeletePurchaseItemIdRef.current) {
			return;
		}
		previousDeletePurchaseItemIdRef.current = onDeletePurchaseItemId;
		await deletePurchaseItemMutation([onDeletePurchaseItemId])
			.unwrap()
			.then((data) => {
				const successMessage = data.message;
				toast.success(successMessage, {
					position: "top-center",
					autoClose: 2000,
				});
			});
	};

	const handleDeleteCheckedPurchaseItems: () => void = async () => {
		if (checkedPurchaseItems.length < 1) {
			toast.error("Vui lòng tích chọn sản phẩm cần xóa", {
				position: "top-right",
				autoClose: 2000,
			});
			return;
		}
		const purchaseItemIds = checkedPurchaseItems.map((checkedPurchaseItem) => checkedPurchaseItem._id);
		await deletePurchaseItemMutation(purchaseItemIds)
			.unwrap()
			.then((data) => {
				const successMessage = data.message;
				toast.success(successMessage, {
					position: "top-center",
					autoClose: 2000,
				});
			});
	};

	const getTotalCheckedPurchaseItemsPrice: () => number = useCallback(() => {
		const totalCheckedPurchaseItemsPrice = checkedPurchaseItems.reduce((result, checkedPurchaseItem) => {
			return result + checkedPurchaseItem.buy_count * checkedPurchaseItem.price;
		}, 0);
		return totalCheckedPurchaseItemsPrice;
	}, [checkedPurchaseItems]);

	const getTotalCheckedPurchaseItemsSavingPrice: () => number | null = useCallback(() => {
		const totalCheckedPurchaseItemsPriceBeforeDiscount = checkedPurchaseItems.reduce((result, checkedPurchaseItem) => {
			return (result as number) + (checkedPurchaseItem.buy_count as number) * (checkedPurchaseItem.price_before_discount as number);
		}, 0);
		const totalCheckedPurchaseItemsPrice = getTotalCheckedPurchaseItemsPrice;
		const totalCheckedPurchaseItemsSavingPrice = totalCheckedPurchaseItemsPriceBeforeDiscount - totalCheckedPurchaseItemsPrice();
		if (totalCheckedPurchaseItemsSavingPrice > 0) return totalCheckedPurchaseItemsSavingPrice;
		return null;
	}, [getTotalCheckedPurchaseItemsPrice, checkedPurchaseItems]);

	const { t } = useTranslation("cart");

	return (
		<div className='flex justify-center bg-[rgba(0,0,0,.09] pt-5 pb-10'>
			<Helmet>
				<title>Quản lý giỏ hàng | Shopee clone</title>
				<meta name='description' content='Chức năng quản lý giỏ hàng - Dự án Shopee clone' />
			</Helmet>
			{extendPurchaseList && extendPurchaseList.length < 1 && (
				<div className='flex w-[1200px]'>
					<div className='m-auto flex flex-col justify-center items-center'>
						<img className='w-[108px] h-[98px]' src={emtyCartBackground} alt='emtyCartBackground' />
						<p className='text-sm text-[#00000066] mt-5'>{t("emtyCart.your shopping cart is emty")}</p>
						<Button
							to={productListUrl}
							childrenClassName={"text-base text-white capitalize"}
							className={"rounded-sm px-[42px] py-[10px] bg-[#ee4d2d] mt-5 hover:bg-[#f05d40]"}
						>
							{t("emtyCart.go shopping now")}
						</Button>
					</div>
				</div>
			)}
			{extendPurchaseList && extendPurchaseList.length > 0 && (
				<div className='flex flex-col w-[1200px] xl:w-screen'>
					<TitleArea isCheckFull={isCheckFull} handleCheckFull={handleCheckFull} />
					{extendPurchaseList.map((extendPurchaseItem, extendPurchaseItemIndex) => {
						const purchaseItemBuyCount = purchaseList?.find((_, index) => index === extendPurchaseItemIndex)?.buy_count;
						return (
							<PurchaseItem
								key={extendPurchaseItemIndex}
								extendPurchaseItem={extendPurchaseItem}
								extendPurchaseItemIndex={extendPurchaseItemIndex}
								purchaseItemBuyCount={purchaseItemBuyCount}
								handleCheck={handleCheck}
								handleUpdateQuantityPurchaseItem={handleUpdateQuantityPurchaseItem}
								handleTypeQuantity={handleTypeQuantity}
								handleDeletePurchaseItem={handleDeletePurchaseItem}
							/>
						);
					})}
					<SettlementArea
						isCheckFull={isCheckFull}
						extendPurchaseList={extendPurchaseList}
						handleCheckFull={handleCheckFull}
						handleDeletePurchaseItems={handleDeleteCheckedPurchaseItems}
						checkedPurchaseItemsCount={checkedPurchaseItemsCount}
						getTotalCheckedPurchaseItemsPrice={getTotalCheckedPurchaseItemsPrice}
						getTotalCheckedPurchaseItemsSavingPrice={getTotalCheckedPurchaseItemsSavingPrice}
						handleBuyCheckedPurchaseItems={handleBuyCheckedPurchaseItems}
						buyCheckedPurchaseItemsIsLoading={buyCheckedPurchaseItemsIsLoading}
					/>
				</div>
			)}
		</div>
	);
}
