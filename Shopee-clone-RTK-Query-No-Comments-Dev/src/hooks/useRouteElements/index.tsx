// react hooks:
import { lazy, Suspense } from "react";
// react - router - dom:
import { Navigate, Outlet, useRoutes } from "react-router-dom";
// layouts:
import { RegisterLayout, MainLayout, CartLayout, UserProfileLayout } from "src/layouts";
// paths constants:
import { paths } from "src/constants";
// types
import { RootState } from "src/types";
// react redux
import { useSelector } from "react-redux";

const Cart = lazy(() => import("src/pages/Cart"));
const Login = lazy(() => import("src/pages/Login"));
const ProductList = lazy(() => import("src/pages/ProductList"));
const Profile = lazy(() => import("src/pages/UserProfile/Profile"));
const Register = lazy(() => import("src/pages/Register"));
const ProductItemDetail = lazy(() => import("src/pages/ProductItemDetail"));
const ChangePassword = lazy(() => import("src/pages/UserProfile/ChangePassword"));
const Purchases = lazy(() => import("src/pages/UserProfile/Purchases"));
const PageNotFound = lazy(() => import("src/pages/PageNotFound"));

// Route quản lý việc: ngăn chặn truy cập vào Route Profile khi chưa Login -> cố tình truy cập thì Navigate về Route login
const ProtectedRoute: () => React.ReactElement = () => {
	const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
	return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

// Route quản lý việc ngăn chặn truy cập vào Route login hoặc register, khi đã login
const RejectedRoute: () => React.ReactElement = () => {
	// lấy giá trị của biến isLoggedIn từ reducer:
	const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
	// nếu !isLoggedIn -> chưa login -> cho phép truy cập vào /login hoặc /register, còn đã login -> Navigate về Route /
	return !isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default function useRouteElements() {
	const { cart, profile, changePassword, purchases, login, register, productItemDetail, productList, user } = paths;
	const element = useRoutes([
		{
			path: "",
			element: <ProtectedRoute />, // -> Những route cần đăng nhập
			children: [
				{
					path: cart,
					element: (
						<CartLayout>
							<Suspense>
								<Cart />
							</Suspense>
						</CartLayout>
					),
				},
				// My Account
				{
					path: user,
					element: <MainLayout />,
					children: [
						{
							path: "",
							element: <UserProfileLayout />,
							children: [
								{
									path: profile,
									element: (
										<Suspense>
											<Profile />
										</Suspense>
									),
								},
								{
									path: changePassword,
									element: (
										<Suspense>
											<ChangePassword />
										</Suspense>
									),
								},
								{
									path: purchases,
									element: (
										<Suspense>
											<Purchases />
										</Suspense>
									),
								},
							],
						},
					],
				},
			],
		},
		{
			path: "",
			element: <RejectedRoute />,
			children: [
				{
					path: "",
					element: <RegisterLayout />,
					children: [
						{
							path: login,
							element: (
								<Suspense>
									<Login />
								</Suspense>
							),
						},
						{
							path: register,
							element: (
								<Suspense>
									<Register />
								</Suspense>
							),
						},
					],
				},
			],
		},
		{
			path: "",
			element: <MainLayout />,
			children: [
				{
					path: productItemDetail, // :id, click vào thẻ Link -> bắn path url /[ProductItemId] lên thanh url -> render Element
					index: true,
					element: (
						<Suspense>
							<ProductItemDetail />
						</Suspense>
					),
				},
				{
					path: productList,
					index: true,
					element: (
						<Suspense>
							<ProductList />
						</Suspense>
					),
				},
				{
					path: "*",
					element: (
						<Suspense>
							<PageNotFound />
						</Suspense>
					),
				},
			],
		},
	]);
	return element;
}
