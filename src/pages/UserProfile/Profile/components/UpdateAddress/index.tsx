// react
import { Fragment } from "react";
// react hook form
import { useFormContext, Controller } from "react-hook-form";
// types:
import { UserProfilePickedFormData } from "src/types";
// common components:
import { Input } from "src/components";

interface UpdateAddressPropsType {
	addressFieldTitle: string;
}

export default function UpdateAddress({ addressFieldTitle }: UpdateAddressPropsType) {
	const {
		control,
		formState: { errors: formErrors },
	} = useFormContext<UserProfilePickedFormData>();
	return (
		<div className='flex'>
			<div className='flex items-center justify-end basis-[33.33%] pb-[30px] xl:justify-start xl:basis-[8%] lg:min-w-[71px]'>
				<p className='text-xs text-[#555555CC] capitalize'>{addressFieldTitle}</p>
			</div>
			<div className='basis-[66.66%] pl-5 pb-[10px] flex flex-col xl:flex-1'>
				{/* 
              <Controller> - component từ thư viện react-hook-form để quản lý trường input và 
              giúp kết nối giữa trường input và React Hook Form.
              -> Chẳng qua là 1 sự thay thế cho register
        */}
				<Controller
					// - Prop 'control' được truyền vào Controller để liên kết nó với quản lý biểu mẫu
					// (form control) của React Hook Form.
					control={control}
					name='address'
					render={({ field }) => (
						<Input
							placeholder='Địa chỉ...'
							// container elements:
							ContainerElement={Fragment as React.ElementType}
							ErrorContainerElement={"p" as React.ElementType}
							// error messages
							errorMessage={formErrors?.address?.message as string}
							// classNames
							classNameInput={`w-full p-3 border rounded-sm outline-none profileInputBoxShadow ${
								formErrors?.address ? "border-[#ff424f] bg-[#fff9fa]" : "border-[rgba(0,0,0,.14)]"
							}`}
							classNameError='text-sm text-[#ff424f] min-h-[20px] mt-1'
							// field props
							onChange={field.onChange}
							// Value được set bằng setValue được set vào field.value
							// -> cần kết nối value của input với field.value
							value={field.value}
						/>
					)}
				/>
			</div>
		</div>
	);
}
