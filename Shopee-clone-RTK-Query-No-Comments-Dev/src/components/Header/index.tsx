// react hooks
import { useMemo } from "react";
// react-hook-form:
import { useForm } from "react-hook-form";
// react toastify
import { toast } from "react-toastify";
// yup:
import { yupResolver } from "@hookform/resolvers/yup";
// react-router-dom:
import { createSearchParams, useNavigate } from "react-router-dom";
// lodash:
import omit from "lodash/omit";
// react redux
import { useDispatch, useSelector } from "react-redux";
// app context
// custome hooks:
import { useQueryConfig } from "src/hooks";
// actions
import { setIsLoggedInAction, setUserProfileAction } from "src/slices/appSlice";
// RTK Query hooks
import { useLogoutMutation } from "src/sliceApis/authenticationSliceApi";
// types:
import { ProductListSearchFormType, HeaderPropsType, RootState } from "src/types";
// schemas:
import { productListSearchSchema } from "src/utils";
// constants:
import { paths, purchaseStatus } from "src/constants";
// api actions
import { useGetPurchaseListQuery } from "src/sliceApis/cartSliceApi";
// slices
import { cartSliceApi } from "src/sliceApis";
// private components:
import { LoginRegisterLanguages, SearchForm, ShopeeHeaderLogo, Cart } from "./components";

// Trước mắt component Header dùng cho MainLayout -> Layout sau khi đăng nhập thành công
export default function Header({ isHeaderForCartLayout = false }: HeaderPropsType) {
	const isLoggedIn = useSelector((state: RootState) => state.app.isLoggedIn);
	const userProfile = useSelector((state: RootState) => state.app.userProfile);
	// constants:
	const { inCart } = purchaseStatus;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		reset: resetForm,
		register,
		handleSubmit,
	} = useForm<ProductListSearchFormType>({
		defaultValues: {
			productListSearchForm: "",
		},
		resolver: yupResolver(productListSearchSchema),
	});

	const queryConfig = useQueryConfig();

	// Mutation quản lý chức năng logout
	const [logoutMutation] = useLogoutMutation();

	// query data quản lý tác vụ get purchase list
	const { data: purchaseListQueryData } = useGetPurchaseListQuery(
		{ status: inCart },
		{
			skip: !isLoggedIn,
		},
	);

	// method quản lý chức năng Logout:
	const handleLogout = async () => {
		try {
			const response = await logoutMutation().unwrap();
			const logoutSuccessMessage = response.message;
			console.log("logoutSuccessMessage: ", logoutSuccessMessage);
			if (logoutSuccessMessage) {
				dispatch(setIsLoggedInAction(false));
				dispatch(setUserProfileAction(null));
				dispatch(cartSliceApi.util.resetApiState());
				toast.success(logoutSuccessMessage, {
					position: "top-center",
					autoClose: 2000,
				});
			}
		} catch (error) {
			console.log("error logout: ", error);
		}
	};

	// method quản lý chức năng submit form:
	const handleSubmitForm = handleSubmit((dataFormSuccess) => {
		const productName = dataFormSuccess.productListSearchForm;
		const config = queryConfig.order
			? omit(
					{
						...queryConfig,
						// ghi đè thuộc tính name:
						name: productName,
					},
					["order", "sort_by"],
			  )
			: {
					...queryConfig,
					// ghi đè thuộc tính name:
					name: productName,
			  };
		navigate({
			pathname: paths.defaultPath,
			search: createSearchParams(config).toString(),
		});
		resetForm();
	});
	const purchaseList = useMemo(() => purchaseListQueryData?.data, [purchaseListQueryData]);
	return (
		<div
			className={`text-white w-full flex h-[119px] ${
				isHeaderForCartLayout
					? "bg-white border-b border-[rgba(0,0,0,.09)]"
					: "bg-[linear-gradient(-180deg,#f53d2d,#f63)] z-[999] lg:sticky lg:top-0 lg:right-0 lg:left-0"
			}`}
		>
			<div className={`flex flex-col justify-start w-[1200px] h-full m-auto ${isHeaderForCartLayout ? "flex justify-center" : ""} xl:w-full`}>
				{!isHeaderForCartLayout && <LoginRegisterLanguages isLoggedIn={isLoggedIn} userProfile={userProfile} handleLogout={handleLogout} />}
				<div
					className={`flex items-center justify-between flex-1 ${
						isHeaderForCartLayout ? "w-[1200px] xl:grid xl:grid-cols-1 xl:w-[100%] xl:justify-center" : ""
					}`}
				>
					<ShopeeHeaderLogo isHeaderForCartLayout={isHeaderForCartLayout} />
					<SearchForm isHeaderForCartLayout={isHeaderForCartLayout} handleSubmitForm={handleSubmitForm} register={register} />
					{!isHeaderForCartLayout && <Cart purchaseList={purchaseList} isLoggedIn={isLoggedIn} />}
				</div>
			</div>
		</div>
	);
}
