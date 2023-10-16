// redux toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ExtendPurchaseSuccessResponse, PurchaseSliceInitialStateType } from "src/types";

const initialState: PurchaseSliceInitialStateType = {
	extendPurchaseList: [],
};

const purchaseListSlice = createSlice({
	name: "purchaseList",
	initialState,
	reducers: {
		// 1. action quản lý chức năng thay đổi trạng thái đăng nhập ứng dụng
		updateExtendPurchaseListAction: (state, action: PayloadAction<ExtendPurchaseSuccessResponse[]>) => {
			console.log("extend purchase list from component: ", action.payload);
			state.extendPurchaseList = action.payload;
		},
		// 2. action quản lý chức năng thay đổi trạng thái disable của Purchase Item
		setPurchaseItemDisableStatusAction: (state, action: PayloadAction<number>) => {
			const newExtendPurchaseList = state.extendPurchaseList.map((extendPurchaseItem, index) => {
				if (index === action.payload) {
					extendPurchaseItem.disabled = true;
				}
				return extendPurchaseItem;
			});
			state.extendPurchaseList = newExtendPurchaseList;
		},
		// 3. action quản lý chức năng thay đổi Quantity Purchase Item bằng cách nhập tay từ bàn phím
		setPurchaseItemQuantityOnTypeAction: (state, action: PayloadAction<{ purchaseItemIndex: number; buyCountValue: number }>) => {
			const newExtendPurchaseList = state.extendPurchaseList.map((extendPurchaseItem, index) => {
				if (index === action.payload.purchaseItemIndex) {
					extendPurchaseItem.buy_count = action.payload.buyCountValue;
				}
				return extendPurchaseItem;
			});
			state.extendPurchaseList = newExtendPurchaseList;
		},
		// 4. action quản lý chức năng thay đổi trạng thái check của Purchase Item
		setPurchaseItemCheckStatusAction: (state, action: PayloadAction<{ purchaseItemIndex: number; purchaseItemCheckStatus: boolean }>) => {
			const newExtendPurchaseList = state.extendPurchaseList.map((extendPurchaseItem, index) => {
				if (index === action.payload.purchaseItemIndex) {
					extendPurchaseItem.isCheck = action.payload.purchaseItemCheckStatus;
				}
				return extendPurchaseItem;
			});
			state.extendPurchaseList = newExtendPurchaseList;
		},
		// 5. action quản lý chức năng tích chọn toàn bộ Purchase Item trong List.
		// -> thay đổi toàn bộ trạng thái isCheck của các phần tử trong list extendPurchaseList
		setAllPurchaseItemCheckStatusAction: (state, action: PayloadAction<ExtendPurchaseSuccessResponse[]>) => {
			const newExtendPurchaseList = action.payload;
			state.extendPurchaseList = newExtendPurchaseList;
		},
	},
});
export const {
	setPurchaseItemCheckStatusAction,
	updateExtendPurchaseListAction,
	setPurchaseItemDisableStatusAction,
	setPurchaseItemQuantityOnTypeAction,
	setAllPurchaseItemCheckStatusAction,
} = purchaseListSlice.actions;
const purchaseListReducer = purchaseListSlice.reducer;
export default purchaseListReducer;
