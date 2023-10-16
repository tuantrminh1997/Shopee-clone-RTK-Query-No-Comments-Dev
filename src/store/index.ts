// redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// slice apis
import { userProfileSliceApi, cartSliceApi, authenticationSliceApi, productItemDetailSliceApi, productListSliceApi } from "src/sliceApis";
// local slices
import { purchaseListReducer, appReducer } from "src/slices";

// Array quản lý các middlewares
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
	// sau khi thêm reducer được tạo từ api slice
	// Chú ý nếu không thêm đoạn cấu hình middleware này thì RTK Query sẽ báo lỗi thiếu middlewares
	// -> thêm tiếp api middleware để enable các tính năng như: caching, invalidation, polling của RTK Query
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...apiMiddlewares),
});
// Bước tiếp theo là setupLisstener cho store.dispatch, Optional, tuy nhiên sẽ là bắt buộc khi ta muốn dùng tính năng refetchOnFocus, refetchOnReconnect
setupListeners(store.dispatch);
export default store;
