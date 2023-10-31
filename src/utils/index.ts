export { default as httpInstance } from "./api/httpInstance";

/**
 * Ta sử dụng function getFormRules thay vì dùng object formRules
 */
export { default as formRules } from "./rules/formRules";
export { default as getFormRules } from "./rules/getFormRules";
// util schema: tham chiếu đến thuộc tính schema cần confirm:
export { default as handleConfirmPasswordSchema } from "./schemas/handleConfirmPasswordSchema";

/**
 * Sau khi tìm hiểu Yup - React Hook Form -> chuyển sang dùng Yup thay vì function getFormRules
 */
export { default as formRulesSchema } from "./schemas/formRulesSchema";
/**
 * formRulesLoginSchema cho Login
 */
export { default as formRulesLoginSchema } from "./schemas/formRulesLoginSchema";
// access_token: lưu, lấy, xoá Access_Token vào/từ local storage
export { default as clearAccessTokenFromLocalStorage } from "./authentication/accessToken/clearAccessTokenFromLocalStorage";
export { default as getAccessTokenFromLocalStorage } from "./authentication/accessToken/getAccessTokenFromLocalStorage";
export { default as saveAccessTokenToLocalStorage } from "./authentication/accessToken/saveAccessTokenToLocalStorage";
// userProfile: lưu, lấy, xoá userProfile vào/từ local storage
export { default as getUserProfileFromLocalStorage } from "./authentication/userProfile/getUserProfileFromLocalStorage";
export { default as saveUserProfileToLocalStorage } from "./authentication/userProfile/saveUserProfileToLocalStorage";
export { default as clearUserProfileFromLocalStorage } from "./authentication/userProfile/clearUserProfileFromLocalStorage";
// format currency methods:
export { default as formatCurrency } from "./formatCurrencyMethods/formatCurrency";
export { default as formatNumberToSocialStyle } from "./formatCurrencyMethods/formatNumberToSocialStyle";
// filter schema
export { default as filterPriceSchema } from "./schemas/filterPriceSchema";
// type loại bỏ type undefined của các thuộc tính trong Interface/Type khác
export type { default as NoUndefinedField } from "./NoUndefinedField";
// method handle chức năng sửa path url Product Item Page
export { default as removeSpecialCharacter } from "./productItemUrl/removeSpecialCharacter";
export { default as generateNameIdStringUrl } from "./productItemUrl/generateNameIdStringUrl";
export { default as getIdFromNameId } from "./productItemUrl/getIdFromNameId";
// Schema khung tìm kiếm tên sản phẩm:
export { default as productListSearchSchema } from "./schemas/productListSearchSchema";
// event targets, event messages:
export { default as clearLocalStorageEventTarget } from "./eventTargets/clearLocalStorageEventTarget";
export { default as clearAccessTokenUserProfileEvent } from "./eventMessages/clearAccessTokenUserProfileEvent";
export { default as clearAccessTokenUserProfileEventMessage } from "./eventMessages/clearAccessTokenUserProfileEventMessage";
// user profile schema
export { default as userProfileSchema } from "./schemas/userProfileSchema";
export { default as userProfilePickedSchema } from "./schemas/userProfilePickedSchema";
// schema change password:
export { default as changePasswordPickedSchema } from "./schemas/changePasswordPickedSchema";
// user profile utils:
export { default as getUserAvatarUrl } from "./userProfile/getUserAvatarUrl";
export { default as getFileExtension } from "./userProfile/getFileExtension";
export { default as getTruthyImageFileExtension } from "./userProfile/getTruthyImageFileExtension";
export { default as getTruthyImageFileSize } from "./userProfile/getTruthyImageFileSize";
export { default as getTruthyImageFileType } from "./userProfile/getTruthyImageFileType";
export { default as getCurrentFileSizeAsMB } from "./userProfile/getCurrentFileSizeAsMB";
export { default as isUserAccountPath } from "./userProfile/isUserAccountPath";
// refresh_token utils:
export { default as saveRefreshTokenToLocalStorage } from "./authentication/refreshToken/saveRefreshTokenToLocalStorage";
export { default as clearRefreshTokenFromLocalStorage } from "./authentication/refreshToken/clearRefreshTokenFromLocalStorage";
export { default as getRefreshTokenFromLocalStorage } from "./authentication/refreshToken/getRefreshTokenFromLocalStorage";
// type predicate functions:
export { default as isAxiosErrorTypePredicateMethod } from "./typePredicates/isAxiosErrorTypePredicateMethod";
export { default as isAxiosUnprocessableEntityError } from "./typePredicates/422errors/isAxiosUnprocessableEntityError";
export { default as isAxiosUnauthorizedError } from "./typePredicates/401errors/isAxiosUnauthorizedError";
export { default as isNotUnprocessableEntityError } from "./typePredicates/isNotUnprocessableEntityError";
export { default as isAxiosExpiredTokenError } from "./typePredicates/401errors/isAxiosExpiredTokenError";
export { default as isUnprocessableEntityError } from "./typePredicates/422errors/isUnprocessableEntityError";
