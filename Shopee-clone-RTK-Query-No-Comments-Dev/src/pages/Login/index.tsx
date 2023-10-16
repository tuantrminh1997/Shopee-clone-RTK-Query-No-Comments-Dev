/* eslint-disable @typescript-eslint/no-explicit-any */
// libraries
// react hooks:
import { useMemo, useState } from "react";
// Sử dụng {Helmet} từ react helmet async thay vì { Helmet } từ react-helmet -> handle vấn đề báo lỗi ở console Using UNSAFE_componentWillMount ...v...v.....
import { Helmet } from "react-helmet-async";
// yup:
import { yupResolver } from "@hookform/resolvers/yup";
// react hook form:
import { useForm } from "react-hook-form";
// react-router-dom
import { Link, useLocation, useNavigate } from "react-router-dom";
// reac redux
import { useDispatch } from "react-redux";
// i18n
import { useTranslation } from "react-i18next";
// types:
import { FormRulesLogin, FormRulesSchema, ErrorResponseApi, User, AuthenticationSuccessResponse } from "src/types";
// form rules:
import { isUnprocessableEntityError, formRulesLoginSchema } from "src/utils";
// actions
import { setIsLoggedInAction, setUserProfileAction } from "src/slices/appSlice";
// common components:
import { Input, Button } from "src/components";
import { paths } from "src/constants";
// RTK Query hooks:
import { useLoginMutation } from "src/sliceApis/authenticationSliceApi";

export default function Login() {
	// App Context:
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormRulesLogin>({
		resolver: yupResolver<FormRulesLogin>(formRulesLoginSchema),
	});

	// rtk query:
	const [loginMutate, { isLoading: loginMutateLoadingStatus }] = useLoginMutation();
	const dispatch = useDispatch();

	// Method quản lý chức năng submit form
	// handleSubmit: (onValid: SubmitHandler<FormData>, onInvalid?: SubmitErrorHandler<FormData> | undefined)
	const onsubmit = handleSubmit(async (loginData) => {
		try {
			const response = await loginMutate(loginData).unwrap();
			dispatch(setIsLoggedInAction(true));
			const userProfile = (response.data as AuthenticationSuccessResponse).data.user;
			dispatch(setUserProfileAction(userProfile as User));
			navigate("/");
		} catch (error: any) {
			if (isUnprocessableEntityError<ErrorResponseApi<Omit<FormRulesSchema, "confirm_password">>>(error.response)) {
				// Bắt lỗi 422 bằng typePredicate
				const formError = error.response.data.data; // form = {email: string, password: string}
				if (formError) {
					Object.keys(formError).forEach((property) => {
						setError(property as keyof Omit<FormRulesSchema, "confirm_password">, {
							message: formError[property as keyof Omit<FormRulesSchema, "confirm_password">],
							type: "ServerResponse",
						});
					});
				}
			}
		}
	});
	const { t } = useTranslation("loginRegister");
	const { login: loginPath } = paths;
	const pathname = useLocation().pathname;
	const { changePassword } = paths;

	// state quản lý trạng thái show/hive icon Eye:
	const [openEyeIconMode, setOpenEyeIconMode] = useState<boolean>(false);
	const handleToggleShowPassword: (openEyeIconMode: boolean) => void = (openEyeIconMode: boolean) => {
		setOpenEyeIconMode(openEyeIconMode);
	};
	const inputType = useMemo(() => (openEyeIconMode ? "text" : "password"), [openEyeIconMode]);
	return (
		<div className='bg-orange'>
			<Helmet>
				<title>Đăng nhập | Shopee clone</title>
				<meta name='description' content='Chức năng đăng nhập - Dự án Shopee clone' />
			</Helmet>
			<div className='container'>
				<div className='grid grid-cols-5 pr-10 lg:pl-10 py-32 lg:py-12 lowMobile:px-[2px]'>
					<div className='col-start-4 col-span-2 lg:col-start-1 lg:col-span-5 '>
						<form className='p-10 rouned bg-white shadow-sm' onSubmit={onsubmit} noValidate>
							<div className='text-2xl capitalize'>{t("login.login")}</div>
							<Input<FormRulesLogin>
								formPropertyName='email'
								classNameContainer={"mt-3"}
								classNameError={"mt-1 text-red-600 min-h-[1.25rem] text-sm"}
								classNameInput={"p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"}
								type='email'
								placeholder={t("login.email")}
								register={register}
								errorMessage={errors.email?.message}
							/>
							<Input<FormRulesLogin>
								formPropertyName='password'
								classNameContainer={"mt-3"}
								classNameError={"mt-1 text-red-600 min-h-[1.25rem] text-sm"}
								classNameInput={"p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"}
								autoComplete='on'
								placeholder={t("login.password")}
								register={register}
								errorMessage={errors.password?.message}
								handleToggleShowPassword={handleToggleShowPassword as (openEyeIconMode: boolean) => void}
								type={(pathname === loginPath ? inputType : "password") as string}
								pathname={changePassword}
							/>
							<div className='mt-3'>
								<Button
									type='submit'
									className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex items-center justify-center'
									isLoading={loginMutateLoadingStatus}
									disabled={loginMutateLoadingStatus}
								>
									{t("login.login")}
								</Button>
							</div>
							<div className='flex items-center justify-center mt-8 lowerMobile:flex-col'>
								<span className='text-gray-500 lowerMobile:mb-3 capitalize'>{t("login.do not have an account ?")}</span>
								<Link className='text-red-700 ml-1 capitalize' to='/register'>
									{t("login.register")}
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
