export { default as paths } from "./paths";
export { default as order } from "./productConstants/productList/productListQueryParams/order";
export { default as sortBy } from "./productConstants/productList/productListQueryParams/sortBy";
// ProductList:
//  Sắp xếp theo giá
export { default as sortButtons } from "./productConstants/productList/productListTextAttributes/sortButtons";
// ProductItem
export { default as productItemAttributes } from "./productConstants/productItem/productItemAttributes";
// aside filter
export { default as asideFilter } from "./productConstants/productList/productListTextAttributes/asideFilter";
export { default as authenticationButtonsAttributes } from "./authenticationButtons";
// product item detail
export { default as productItemDetailInformationAttributes } from "./productConstants/productItem/productItemDetailInformationAttributes";
export { default as productItemQuantityControllerAttributes } from "./productConstants/productItem/productItemQuantityControllerAttributes";
export { default as purchaseStatus } from "./myAccount/purchaseStatus";
export { default as cartTextAttributes } from "./cart/cartTextAttributes";
export { default as cartConstants } from "./cart/cartConstants";
export { default as asideFilterConstants } from "./asideFilter/asideFilterConstants";
export { default as purchaseTabs } from "./myAccount/purchaseTabs";
export { default as purchaseListConstants } from "./myAccount/purchasesListConstants";

// api urls:
// authentication:
export { default as loginPathURL } from "./apiUrls/authentication/loginPathURL";
export { default as logoutPathURL } from "./apiUrls/authentication/logoutPathURL";
export { default as registerPathURL } from "./apiUrls/authentication/registerPathURL";
export { default as refreshTokenPathURL } from "./apiUrls/authentication/refreshTokenPathURL";
// cart:
export { default as cartBasePathURL } from "./apiUrls/cart/cartBasePathURL";
export { default as addToCartPathURL } from "./apiUrls/cart/addToCartPathURL";
export { default as buyProductsPathURL } from "./apiUrls/cart/buyProductsPathURL";
export { default as getPurchaseListPathURL } from "./apiUrls/cart/getPurchaseListPathURL";
export { default as updatePurchasePathURL } from "./apiUrls/cart/updatePurchasePathURL";
// categories:
export { default as categoriesBasePathURL } from "./apiUrls/category/categoriesBasePathURL";
// products:
export { default as productsBasePathURL } from "./apiUrls/products/productsBasePathURL";
export { default as loginPageTextNodes } from "./loginPageTextNodes";
// header:
export { default as headerTextNodes } from "./header/headerTextNodes";
export { default as headerChangeLanguageOptions } from "./header/headerChangeLanguageOptions";
export { default as loginRegisterConstants } from "./header/loginResgiterConstants";
// my account
export { default as myAccountFormConstants } from "./myAccount/myAccountFormConstants";
export { default as myAccountUploadUserAvatarConstants } from "./myAccount/myAccountUploadUserAvatarConstants";
// user profile:
export { default as userProfileBasePathURL } from "./apiUrls/userProfile/userProfileBasePathURL";
export { default as updateUserProfileBasePathURL } from "./apiUrls/userProfile/updateUserProfileBasePathURL";
export { default as uploadUserAvatarPathURL } from "./apiUrls/userProfile/uploadUserAvatarPathURL";
