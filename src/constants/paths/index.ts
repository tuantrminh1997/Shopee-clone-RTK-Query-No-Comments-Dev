const paths = {
	baseURL: "https://api-ecom.duthanhduoc.com/",
	// My Account ->
	user: "/user",
	// MyAccount children: >
	profile: "/user/account/profile",
	changePassword: "/user/account/password",
	purchases: "/user/purchases",
	// MyAccount children: <
	login: "/login",
	register: "/register",
	productList: "/",
	logout: "/logout",
	defaultPath: "/",
	productItemDetail: ":itemNameId",
	cart: "/cart",
} as const;
export default paths;
