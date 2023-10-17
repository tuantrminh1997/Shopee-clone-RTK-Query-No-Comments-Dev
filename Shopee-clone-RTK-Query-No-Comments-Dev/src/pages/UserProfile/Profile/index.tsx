/* eslint-disable @typescript-eslint/no-explicit-any */
// Sử dụng {Helmet} từ react helmet async thay vì { Helmet } từ react-helmet -> handle vấn đề báo lỗi ở console Using UNSAFE_componentWillMount ...v...v.....
import { Helmet } from "react-helmet-async";
// react hooks:
import { useCallback, useEffect, useMemo, useState } from "react";
// react hook form:
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// react toastify:
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// i18n
import { useTranslation } from "react-i18next";
// react redux
import { useSelector, useDispatch } from "react-redux";
// types:
import { UserProfilePickedFormData, SuccessResponseApi, User, RootState } from "src/types";
import { AxiosResponse } from "axios";
// schemas, utils:
import {
	// Phương thức lấy ra file ảnh phù hợp
	getTruthyImageFileSize,
	getTruthyImageFileExtension,
	getTruthyImageFileType,
	getCurrentFileSizeAsMB,
	userProfilePickedSchema,
	saveUserProfileToLocalStorage,
	getFileExtension,
	getUserAvatarUrl,
} from "src/utils";
// constants:
import { myAccountUploadUserAvatarConstants } from "src/constants";
// RTK Query hooks
import { useUpdateUserProfileMutation, useGetUserProfileQuery, useUpdateUserAvatarMutation } from "src/sliceApis/userProfileSliceApi";
// private components:
import {
	UploadAvatar,
	// fields
	DateOfBirthSelection,
	UpdateAddress,
	UpdateEmail,
	UpdatePhoneNumber,
} from "./components";
// common components:
import { SubmitFormButton, FormFieldRegister, ProfileTitle, FormInputFields } from "src/components";
import { setUserProfileAction } from "src/slices/appSlice";

export default function Profile() {
	// App Context
	const userProfile = useSelector((state: RootState) => state.app.userProfile);
	const dispatch = useDispatch();

	// constants:
	const { userAvatarMaxSizeAsBytes, fileExtension01, fileExtension02 } = myAccountUploadUserAvatarConstants;

	// mutations quản lý bất đồng bộ
	// 1. Mutation quản lý chức năng get thông tin user
	const { data: userProfileQueryData, isFetching: userProfileQueryLoading, refetch: userProfileQueryRefetch } = useGetUserProfileQuery();
	const userProfileData = useMemo(() => (userProfileQueryData as SuccessResponseApi<User>)?.data, [userProfileQueryData]);

	// 2. Mutation quản lý tác vụ call API -> update user Profile
	const [updateUserProfileMutation, { isLoading: updateUserProfileLoading }] = useUpdateUserProfileMutation();

	// 3. Mutation quản lý tác vụ call API -> update user avatar
	const [updateUserAvatarMutation, { isLoading: updateUserAvatarLoading }] = useUpdateUserAvatarMutation();

	const useFormMethods = useForm<UserProfilePickedFormData>({
		defaultValues: {
			name: "",
			address: "",
			avatar: "",
			phone: "",
			date_of_birth: new Date(1990, 1, 1),
		},
		resolver: yupResolver<UserProfilePickedFormData>(userProfilePickedSchema),
	});

	// Đặt phần khai bso useFormMethods dưới useForm
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors: formErrors },
	} = useFormMethods;

	// Sau khi nhận được dữ liệu userProfileData từ API -> dùng useEffect + setValue (React Hook Form để map các giá trị tương ứng với các thẻ Input trong Form)
	useEffect(() => {
		if (userProfileData) {
			setValue("name", userProfileData.name);
			setValue("phone", userProfileData.phone);
			setValue("address", userProfileData.address);
			setValue("avatar", userProfileData.avatar);
			// date_of_birth không nhận vào prop register nên ta cần handle bằng Controller
			setValue("date_of_birth", userProfileData.date_of_birth ? new Date(userProfileData.date_of_birth) : new Date(1990, 1, 1));
		}
	}, [userProfileData, setValue]);

	// Handle chức năng upload ảnh:
	// local state quản lý file ảnh tải lên từ local
	const [userAvatar, setUserAvatar] = useState<File>();

	const previewAvatar: string = useMemo(
		() => (userAvatar ? URL.createObjectURL(userAvatar) : getUserAvatarUrl(userProfile?.avatar as string)),
		[userAvatar, userProfile?.avatar],
	);

	// Method quản lý submit data form
	const onSubmit = handleSubmit(async (formDataSuccessSchemaRules) => {
		try {
			// Handle chức năng upload ảnh:
			let userAvatarTryBlockScope;
			if (userAvatar) {
				try {
					// FormData - API của javascript
					const formData = new FormData();
					formData.append("image", userAvatar);
					const updateUserProfileResponse = await updateUserAvatarMutation(formData as FormData).unwrap();
					const userAvatarResponse = (updateUserProfileResponse as SuccessResponseApi<string>).data;
					// gán cho biến userAvatarTryBlockScope để có thể sử dụng giá trị mới sau khi gán trong block scope của khối try {}
					userAvatarTryBlockScope = userAvatarResponse;
					// sau khi upload và submit thành công user avatar -> lưu vào field.value
					setValue("avatar", userAvatarTryBlockScope);
				} catch (error: any) {
					throw new Error(error);
				}
			}
			const updateUserProfileResponse = await updateUserProfileMutation({
				...formDataSuccessSchemaRules,
				// ghi đè lại thuộc tính date_of_birth bằng giá trị từ form
				date_of_birth: formDataSuccessSchemaRules?.date_of_birth?.toISOString(),
				// ghi đè lại giá trị user avatar name lấy về từ server:
				avatar: userAvatarTryBlockScope,
			}).unwrap();
			userProfileQueryRefetch();
			const userProfile = (updateUserProfileResponse as SuccessResponseApi<User>).data;
			dispatch(setUserProfileAction(userProfile));
			saveUserProfileToLocalStorage(userProfile);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	// Khởi tạo biến userAvatarFromForm -> truyền sang Component UploadAvatar để lấy dữ liệu avatar từ Form
	const userAvatarFromForm = watch("avatar");

	// Method quản lý chức năng upload avatar từ local lên preview (vẫn ở local):
	const handleSetUserAvatar: (fileFromLocal: File) => void = useCallback(
		(fileFromLocal: File) => {
			const currentFileSizeAsMB = getCurrentFileSizeAsMB((fileFromLocal as File).size);
			const truthyImageFileSize = getTruthyImageFileSize((fileFromLocal as File).size as number, userAvatarMaxSizeAsBytes as number);
			const fileExtension = getFileExtension((fileFromLocal as File).type);
			const truthyImageFileExtension = getTruthyImageFileExtension(fileExtension as string);
			const truthyImageFileType = getTruthyImageFileType((fileFromLocal as File).type);
			if ((fileFromLocal as File) && (!truthyImageFileSize || !truthyImageFileType)) {
				currentFileSizeAsMB;
				toast.error(
					`Chọn ảnh thất bại, file bạn vừa chọn có dung lượng ${currentFileSizeAsMB}MB là ${
						truthyImageFileSize ? "phù hợp" : "quá lớn"
					}; định dạng .${fileExtension} là ${truthyImageFileExtension ? "phù hợp" : "không phù hợp"}, ${
						truthyImageFileSize && !truthyImageFileExtension
							? `kích thước file đã phù hợp tuy nhiên hãy chọn 1 file đúng định dạng ${fileExtension01}, ${fileExtension02}.`
							: ""
					} ${
						!truthyImageFileSize && truthyImageFileExtension
							? "định dạng file đã phù hợp tuy nhiên hãy chọn 1 file ảnh khác có kích thước nhỏ hơn 1MB."
							: ""
					} ${
						!truthyImageFileSize && !truthyImageFileExtension
							? "cả kích thước file lẫn định dạng file đều không phù hợp, hãy lựa chọn 1 file ảnh khác phù hợp hơn."
							: ""
					}` as string,
					{
						autoClose: 3000,
					},
				);
			} else {
				setUserAvatar(fileFromLocal);
				toast.success("Chọn ảnh thành công, nhấn Lưu để tiến hành đồng bộ với Server" as string, {
					autoClose: 2000,
					position: "top-center",
				});
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	const { t } = useTranslation("user");

	return (
		<div className='bg-white min-w-[993px] px-8 pb-[10px] rounded-sm myProfileBoxShadow xl:min-w-full'>
			<Helmet>
				<title>Cập nhật thông tin tài khoản | Shopee clone</title>
				<meta name='description' content='Chức năng cập nhật thông tin tài khoản - Dự án Shopee clone' />
			</Helmet>
			<ProfileTitle />
			<FormProvider {...useFormMethods}>
				<form action='' className='flex pt-[33.33px] xl:grid xl:grid-cols-1' onSubmit={onSubmit}>
					<div className='pr-[100px] basis-[66.66%] xl:pr-0'>
						<FormInputFields
							// fields props
							fields={[
								<FormFieldRegister
									type={"text"}
									key={"uniqueKey" as string}
									fieldTitle={t("content.username")}
									formPropertyName={"name"}
									placeHolder={"Nhập tên hiển thị..."}
									errorMessage={formErrors?.name?.message as string}
								/>,
								<UpdateEmail emailFieldTitle={t("content.email")} key={"uniqueKey" as string} userProfileData={userProfileData} />,
								<UpdatePhoneNumber phoneNumberFieldTitle={t("content.phone number")} key={"uniqueKey" as string} />,
								<UpdateAddress addressFieldTitle={t("content.address")} key={"uniqueKey" as string} />,
								<Controller
									key={"uniqueKey" as string}
									control={control}
									name='date_of_birth'
									render={({ field }) => (
										<DateOfBirthSelection
											dateOfBirthSelectionFieldTitle={t("content.date of birth")}
											errorMessage={formErrors?.date_of_birth?.message as string}
											dateOfBirthValue={field.value}
											onChange={field.onChange}
										/>
									)}
								/>,
								<SubmitFormButton
									key={"uniqueKey" as string}
									userProfileQueryLoading={userProfileQueryLoading as boolean}
									updateUserProfileLoading={updateUserProfileLoading as boolean}
									updateUserAvatarLoading={updateUserAvatarLoading as boolean}
									submitFormButtonTitle={t("content.save")}
								/>,
							]}
						/>
					</div>
					<UploadAvatar
						userAvatarFromForm={userAvatarFromForm as string}
						previewAvatar={previewAvatar as string}
						onSetUserAvatar={handleSetUserAvatar as (fileFromLocal: File) => void}
					/>
				</form>
			</FormProvider>
		</div>
	);
}
