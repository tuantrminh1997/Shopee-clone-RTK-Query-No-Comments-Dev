// react hooks
import { Fragment } from "react";
// react hook form
import { useFormContext, Controller } from "react-hook-form";
// types:
import { UserProfilePickedFormData } from "src/types";
// common components:
import { InputNumber } from "src/components";

interface UpdatePhoneNumberPropsType {
	phoneNumberFieldTitle: string;
}

export default function UpdatePhoneNumber({ phoneNumberFieldTitle }: UpdatePhoneNumberPropsType) {
	const {
		control,
		formState: { errors: formErrors },
	} = useFormContext<UserProfilePickedFormData>();
	return (
		<div className='flex'>
			<div className='flex items-center justify-end basis-[33.33%] pb-[30px] xl:justify-start xl:basis-[8%] lg:min-w-[71px]'>
				<p className='text-xs text-[#555555CC] capitalize'>{phoneNumberFieldTitle}</p>
			</div>
			<div className='pb-[10px] pl-[20px] flex-1'>
				<Controller
					control={control}
					name='phone'
					render={({ field }) => (
						<InputNumber
							placeholder='Số điện thoại...'
							ContainerElement={Fragment as React.ElementType}
							ErrorContainerElement={"p" as React.ElementType}
							classNameInput={`w-full p-3 border rounded-sm outline-none profileInputBoxShadow ${
								formErrors?.phone ? "border-[#ff424f] bg-[#fff9fa]" : "border-[rgba(0,0,0,.14)]"
							}`}
							classNameError='text-sm text-[#ff424f] min-h-[20px] mt-1'
							errorMessage={formErrors?.phone?.message as string}
							onChange={field.onChange}
							value={field.value}
						/>
					)}
				/>
			</div>
		</div>
	);
}
