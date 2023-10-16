// react hooks:
import { memo } from "react";
import { UpdateEmailPropsType } from "src/types";

export default memo(function UpdateEmail({ emailFieldTitle, userProfileData }: UpdateEmailPropsType) {
	return (
		<div className='flex lowMobile:flex-col'>
			<div className='flex items-center justify-end basis-[33.33%] pb-[30px] xl:justify-start xl:basis-[8%] lg:min-w-[71px]'>
				<p className='text-xs text-[#555555CC] capitalize'>{emailFieldTitle}</p>
			</div>
			<div className='basis-[66.66%] pb-[30px] pl-[20px] flex justify-start items-start lowMobile:pl-0'>
				<p className='text-sm text-[#333333] mr-2'>{userProfileData?.email}</p>
			</div>
		</div>
	);
});
