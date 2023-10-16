// react
import { memo, Fragment } from "react";
// react hook form
import { useFormContext, Controller } from "react-hook-form";
// types:
import { UserProfilePickedFormData } from "src/types";
// common components:
import { Input } from "src/components";

export default memo(function FormFieldController() {
	const {
		control,
		formState: { errors: formErrors },
	} = useFormContext<UserProfilePickedFormData>();
	return (
		<div className='flex'>
			<div className='flex items-center justify-end basis-[33.33%] pb-[30px]'>
				<p className='text-xs text-[#555555CC]'>Địa chỉ</p>
			</div>
			<div className='basis-[66.66%] pl-5 pb-[10px] flex flex-col'>
				<Controller
					control={control}
					name='address'
					render={({ field }) => (
						<Input
							placeholder='Địa chỉ...'
							ContainerElement={Fragment as React.ElementType}
							ErrorContainerElement={"p" as React.ElementType}
							errorMessage={formErrors?.address?.message as string}
							classNameInput={`w-full p-3 border rounded-sm outline-none profileInputBoxShadow ${
								formErrors?.address ? "border-[#ff424f] bg-[#fff9fa]" : "border-[rgba(0,0,0,.14)]"
							}`}
							classNameError='text-sm text-[#ff424f] min-h-[20px] mt-1'
							onChange={field.onChange}
							value={field.value}
						/>
					)}
				/>
			</div>
		</div>
	);
});
