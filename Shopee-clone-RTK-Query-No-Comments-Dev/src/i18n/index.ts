/* eslint-disable import/no-named-as-default-member */
// Handle tính năng đa ngôn ngữ trong ứng dụng React - ứng dụng thư viện i18n
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// locales;
// english:
import PRODUCT_LIST_ENGLISH from "src/locales/english/productList.json";
import PRODUCT_ITEM_DETAIL_ENGLISH from "src/locales/english/productItemDetail.json";
import HEADER_ENGLISH from "src/locales/english/header.json";
import LOGIN_REGISTER_ENGLISH from "src/locales/english/loginRegister.json";
import CART_ENGLISH from "src/locales/english/cart.json";
import USER_ENGLISH from "src/locales/english/user.json";
import FOOTER_ENGLISH from "src/locales/english/footer.json";
// vietnamese:
import PRODUCT_LIST_VIETNAMESE from "src/locales/vietnamese/productList.json";
import PRODUCT_ITEM_DETAIL_VIETNAMESE from "src/locales/vietnamese/productItemDetail.json";
import HEADER_VIETNAMESE from "src/locales/vietnamese/header.json";
import LOGIN_REGISTER_VIETNAMESE from "src/locales/vietnamese/loginRegister.json";
import CART_VIETNAMESE from "src/locales/vietnamese/cart.json";
import USER_VIETNAMESE from "src/locales/vietnamese/user.json";
import FOOTER_VIETNAMESE from "src/locales/vietnamese/footer.json";
// locales = handle vấn đề load tên ngôn ngữ đã target lên phần hover target
export const locales = {
	vietnamese: "tiếng việt",
	english: "english",
};

export const defaultNamespace = "home";
// -> đặt xuống defaultNS tại i18 để phân phối ra toàn bộ dự án

export const resources = {
	vietnamese: {
		productList: PRODUCT_LIST_VIETNAMESE,
		productItemDetail: PRODUCT_ITEM_DETAIL_VIETNAMESE,
		header: HEADER_VIETNAMESE,
		loginRegister: LOGIN_REGISTER_VIETNAMESE,
		cart: CART_VIETNAMESE,
		user: USER_VIETNAMESE,
		footer: FOOTER_VIETNAMESE,
	},
	// namespace
	english: {
		productList: PRODUCT_LIST_ENGLISH,
		productItemDetail: PRODUCT_ITEM_DETAIL_ENGLISH,
		header: HEADER_ENGLISH,
		loginRegister: LOGIN_REGISTER_ENGLISH,
		cart: CART_ENGLISH,
		user: USER_ENGLISH,
		footer: FOOTER_ENGLISH,
	},
} as const;

// Phân phối bộ chuyển đổi ngôn ngữ ra toàn bộ phạm vi dự án
i18n.use(initReactI18next).init({
	resources,
	lng: "vietnamese",
	// Các namespaces được sử dụng trong dự án
	ns: ["productList", "productItemDetail"],
	fallbackLng: "vietnamese",
	defaultNS: defaultNamespace,
	interpolation: {
		escapeValue: false,
	},
});
export default i18n;
