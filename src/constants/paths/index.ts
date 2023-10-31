const paths = {
	baseURL: "https://api-ecom.duthanhduoc.com/",
	user: "/user",
	profile: "/user/account/profile",
	changePassword: "/user/account/password",
	purchases: "/user/purchases",
	login: "/login",
	register: "/register",
	productList: "/",
	logout: "/logout",
	defaultPath: "/",
	productItemDetail: ":itemNameId",
	cart: "/cart",
} as const;
export default paths;
