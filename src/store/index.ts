import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userProfileSliceApi, cartSliceApi, authenticationSliceApi, productItemDetailSliceApi, productListSliceApi } from "src/sliceApis";
import { purchaseListReducer, appReducer } from "src/slices";

const apiMiddlewares = [
	productListSliceApi.middleware,
	productItemDetailSliceApi.middleware,
	authenticationSliceApi.middleware,
	cartSliceApi.middleware,
	userProfileSliceApi.middleware,
];

const store = configureStore({
	reducer: {
		app: appReducer,
		purchaseList: purchaseListReducer,
		[productListSliceApi.reducerPath]: productListSliceApi.reducer,
		[productItemDetailSliceApi.reducerPath]: productItemDetailSliceApi.reducer,
		[authenticationSliceApi.reducerPath]: authenticationSliceApi.reducer,
		[cartSliceApi.reducerPath]: cartSliceApi.reducer,
		[userProfileSliceApi.reducerPath]: userProfileSliceApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...apiMiddlewares),
});
setupListeners(store.dispatch);
export default store;
