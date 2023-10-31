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

const ProtectedRoute: () => React.ReactElement = () => {
	const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
	return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

const RejectedRoute: () => React.ReactElement = () => {
	const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
	return !isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default function useRouteElements() {
	const { cart, profile, changePassword, purchases, login, register, productItemDetail, productList, user } = paths;
	const element = useRoutes([
		{
			path: "",
			element: <ProtectedRoute />,
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
					path: productItemDetail,
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
