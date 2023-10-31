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
		updateExtendPurchaseListAction: (state, action: PayloadAction<ExtendPurchaseSuccessResponse[]>) => {
			state.extendPurchaseList = action.payload;
		},
		setPurchaseItemDisableStatusAction: (state, action: PayloadAction<number>) => {
			const newExtendPurchaseList = state.extendPurchaseList.map((extendPurchaseItem, index) => {
				if (index === action.payload) {
					extendPurchaseItem.disabled = true;
				}
				return extendPurchaseItem;
			});
			state.extendPurchaseList = newExtendPurchaseList;
		},
		setPurchaseItemQuantityOnTypeAction: (state, action: PayloadAction<{ purchaseItemIndex: number; buyCountValue: number }>) => {
			const newExtendPurchaseList = state.extendPurchaseList.map((extendPurchaseItem, index) => {
				if (index === action.payload.purchaseItemIndex) {
					extendPurchaseItem.buy_count = action.payload.buyCountValue;
				}
				return extendPurchaseItem;
			});
			state.extendPurchaseList = newExtendPurchaseList;
		},
		setPurchaseItemCheckStatusAction: (state, action: PayloadAction<{ purchaseItemIndex: number; purchaseItemCheckStatus: boolean }>) => {
			const newExtendPurchaseList = state.extendPurchaseList.map((extendPurchaseItem, index) => {
				if (index === action.payload.purchaseItemIndex) {
					extendPurchaseItem.isCheck = action.payload.purchaseItemCheckStatus;
				}
				return extendPurchaseItem;
			});
			state.extendPurchaseList = newExtendPurchaseList;
		},
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
