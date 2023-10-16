/* eslint-disable @typescript-eslint/no-explicit-any */
// assets:
import emtyCartBackground from "src/assets/shopee-emty-cart-background.png";
// react hooks:
import { useEffect, useMemo, useCallback } from "react";
// i18n
import { useTranslation } from "react-i18next";
// react redux
import { useDispatch, useSelector } from "react-redux";
// react - router - dom:
import { useLocation } from "react-router-dom";
// lodash: chỉ định rõ function keyBy từ lodash để import mỗi function đó, do lodash ko có cơ chế lọc import -> import toàn bộ thư viện lodash vào component khiến cho dung lượng file
// khi build ra bị nặng lên 1 cách không cần thiết.
import keyBy from "lodash/keyBy";
// Sử dụng {Helmet} từ react helmet async thay vì { Helmet } từ react-helmet -> handle vấn đề báo lỗi ở console Using UNSAFE_componentWillMount ...v...v.....
import { Helmet } from "react-helmet-async";
// react toastify:
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// types
import {
	BuyProductsApiPropsType,
	ExtendPurchaseSuccessResponse,
	ProductItemApiType,
	PurchaseSuccessResponse,
	RootState,
	SuccessResponseApi,
} from "src/types";
// constants
import { purchaseStatus, paths } from "src/constants";
// actions
import {
	setPurchaseItemDisableStatusAction,
	setPurchaseItemQuantityOnTypeAction,
	updateExtendPurchaseListAction,
	setPurchaseItemCheckStatusAction,
	setAllPurchaseItemCheckStatusAction,
} from "src/slices/purchaseListSlice";
// private components:
import { TitleArea, SettlementArea } from "./components";
// common components:
import { PurchaseItem, Button } from "src/components";
// RTK Query hooks
import {
	useBuyCheckedPurchaseItemsMutation,
	useDeletePurchaseItemMutation,
	useGetPurchaseListQuery,
	useUpdateCartPurchaseMutation,
} from "src/sliceApis/cartSliceApi";

export default function Cart() {
	const extendPurchaseList: ExtendPurchaseSuccessResponse[] = useSelector((state: RootState) => state.purchaseList.extendPurchaseList);
	const isLoggedIn: boolean = useSelector((state: RootState) => state.app.isLoggedIn);

	// constants:
	const { inCart } = purchaseStatus;
	const { productList: productListUrl } = paths;
	const dispatch = useDispatch();

	// Query fetching API và get purchase list trong giỏ hàng
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

	// biến đại diện cho toàn bộ Purchase Item đang được check (tối ưu = useMemo do đây là biến)
	const checkedPurchaseItems = useMemo(() => extendPurchaseList.filter((purchaseItem) => purchaseItem.isCheck), [extendPurchaseList]);
	const checkedPurchaseItemsCount = useMemo(() => checkedPurchaseItems.length, [checkedPurchaseItems]);

	// Nhận state từ Route ProductItemDetail, _id của PurchaseItemDetail.
	const location = useLocation();

	const purchaseProductItemDetailIdFromLocation = useMemo(() => location.state?.purchaseProductItemDetailId, [location]);

	// bài toán purchase list trong component cart
	useEffect(() => {
		if (purchaseList) {
			const extendPurchaseObject = keyBy(extendPurchaseList, "_id");
			const newPurchaseList =
				purchaseList.map((purchaseItem) => {
					// Handle chức năng Buy Now
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

	// khi unmounted component Cart
	// -> xóa state id truyền sang từ Component ProductItemDetail (chức năng mua ngay)
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

	// Method quản lý chức năng bật chọn tất cả -> bật thuộc tính isCheck của tất cả các đối tượng.
	const handleCheckFull: () => void = () => {
		const checkFullExtendPurchaseListItems = extendPurchaseList.map((extendPurchaseItem) => {
			const checkedPurchaseItem = { ...extendPurchaseItem, isCheck: !isCheckFull };
			return checkedPurchaseItem;
		});
		dispatch(setAllPurchaseItemCheckStatusAction(checkFullExtendPurchaseListItems));
	};

	// Mutation handle chức năng cập nhật Quantity Product Item trong Cart
	// Handle chức năng thay đổi số lượng sản phẩm trong giỏ hàng
	const [updateCartPurchaseMutation] = useUpdateCartPurchaseMutation();

	const [buyCheckedPurchaseItemsMutation, { isLoading: buyCheckedPurchaseItemsIsLoading }] = useBuyCheckedPurchaseItemsMutation();

	// Method handle chức năng tiến hành mua/thanh toán các Purchase Item đã được check
	const handleBuyCheckedPurchaseItems: () => void = async () => {
		if (checkedPurchaseItemsCount > 0) {
			try {
				const checkedPurchaseItemsToServer: BuyProductsApiPropsType<ProductItemApiType> = checkedPurchaseItems.map((checkedPurchaseItem) => ({
					// product_id: checkedPurchaseItem._id -> lỗi -> đọc lại hệ thống để tìm hiểu nguyên nhân
					product_id: checkedPurchaseItem.product._id,
					buy_count: checkedPurchaseItem.buy_count,
				}));
				const response = await buyCheckedPurchaseItemsMutation(checkedPurchaseItemsToServer);
				const successMessage = (response as { data: SuccessResponseApi<ExtendPurchaseSuccessResponse[]> }).data.message;
				if (successMessage) {
					toast.success(successMessage, {
						position: "top-center",
						autoClose: 2000,
					});
				}
			} catch (error) {
				console.log("error buy checked purchase item");
			}
		}
	};

	const [deletePurchaseItemMutation] = useDeletePurchaseItemMutation();

	// Method quản lý chức năng cập nhật quantity trong cart:
	// - tham số enable: cho phép tiếp tục tăng/giảm quantity
	const handleUpdateQuantityPurchaseItem: (purchaseItemIndex: number, buyCountValue: number, enable: boolean) => void = (
		purchaseItemIndex: number,
		buyCountValue: number,
		enable: boolean,
	) => {
		if (enable) {
			// lấy ra purchaseItem đang được update Quantity:
			const purchaseItem = extendPurchaseList[purchaseItemIndex];
			// Ghi đè thuộc tính disabled === true -> ta sẽ căn cứ vào thuộc tính này để handle việc bật/tắt trạng thái disabled của quantityController
			dispatch(setPurchaseItemDisableStatusAction(purchaseItemIndex));
			// Tiến hành mutate -> truyền product_id + buy_count lên api updateCartPurchaseApi
			updateCartPurchaseMutation({
				product_id: purchaseItem.product._id,
				buy_count: buyCountValue,
			});
		}
		// -> tái sử dụng lại function handleUpdateQuantityPurchaseItem để handle chức năng -> khi out focus -> call API và update quantity
	};

	const handleTypeQuantity: (purchaseItemIndex: number) => (value: number) => void = (purchaseItemIndex: number) => (value: number) => {
		dispatch(setPurchaseItemQuantityOnTypeAction({ purchaseItemIndex, buyCountValue: value }));
	};

	// Method handle chức năng Delete Product Item trong Cart -> xong
	const handleDeletePurchaseItem: (purchaseItemIndex: number) => () => void = (purchaseItemIndex: number) => async () => {
		try {
			const onDeletePurchaseItemId = (
				extendPurchaseList.find(
					(_, extendPurchaseItemIndex: number) => extendPurchaseItemIndex === purchaseItemIndex,
				) as ExtendPurchaseSuccessResponse
			)._id;
			const response = await deletePurchaseItemMutation([onDeletePurchaseItemId]);
			const successMessage = (response as { data: SuccessResponseApi<{ deleted_count: number }> }).data.message;
			if (successMessage) {
				toast(successMessage, { autoClose: 3000 });
			}
		} catch (error) {
			console.log("delete purchase item error", error);
		}
	};

	// Method handle chức năng Delete Product Items trong Cart -> xong
	const handleDeleteCheckedPurchaseItems: () => void = async () => {
		if (checkedPurchaseItems.length < 1) {
			toast("Vui lòng tích chọn sản phẩm cần xóa", { autoClose: 3000 });
		} else {
			const purchaseItemIds = checkedPurchaseItems.map((checkedPurchaseItem) => checkedPurchaseItem._id);
			try {
				const response = await deletePurchaseItemMutation(purchaseItemIds);
				const successMessage = (response as { data: SuccessResponseApi<{ deleted_count: number }> }).data.message;
				if (successMessage) {
					toast(successMessage, { autoClose: 3000 });
				}
			} catch (error) {
				console.log("delete many purchase items error", error);
			}
		}
	};

	// Method quản lý chức năng tính tổng số tiền các sản phẩm được check trong giỏ hàng
	// Method quản lý chức năng tính tổng 1 thuộc tính của tất cả các đối tượng trong 1 array -> reduce
	const getTotalCheckedPurchaseItemsPrice: () => number = useCallback(() => {
		const totalCheckedPurchaseItemsPrice = checkedPurchaseItems.reduce((result, checkedPurchaseItem) => {
			return result + checkedPurchaseItem.buy_count * checkedPurchaseItem.price;
		}, 0);
		return totalCheckedPurchaseItemsPrice;
	}, [checkedPurchaseItems]);

	// Method quản lý chức năng tính tổng số tiền tiết kiệm các sản phẩm được check trong giỏ hàng
	// Method quản lý chức năng tính tổng 1 thuộc tính của tất cả các đối tượng trong 1 array -> reduce
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
			{/* Background giỏ hàng trống rỗng */}
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
								key={extendPurchaseItemIndex} // Hoặc key={extendPurchaseItem._id}
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
						// Tổng giá tiền của các sản phẩm đang được check trong giỏ hàng:
						getTotalCheckedPurchaseItemsPrice={getTotalCheckedPurchaseItemsPrice}
						getTotalCheckedPurchaseItemsSavingPrice={getTotalCheckedPurchaseItemsSavingPrice}
						// Method quản lý chức năng mua các purchase Items đã checked
						handleBuyCheckedPurchaseItems={handleBuyCheckedPurchaseItems}
						buyCheckedPurchaseItemsIsLoading={buyCheckedPurchaseItemsIsLoading}
					/>
				</div>
			)}
		</div>
	);
}
