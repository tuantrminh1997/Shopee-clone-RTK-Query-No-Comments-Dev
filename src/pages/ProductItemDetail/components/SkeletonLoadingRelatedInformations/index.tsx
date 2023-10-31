import { DefaultUserIcon } from "src/icons";

export default function SkeletonLoadingRelatedInformations() {
	return (
		<div className='flex items-center justify-between rounded-sm bg-white mt-2 h-fit w-full p-[25px]'>
			<div className='flex items-center h-[90%] basis-[10%] border-r border-[rgba(0,0,0,.05)]'>
				<div className='flex w-[78px] h-[78px] rounded-[50%] border border-[rgba(0,0,0,.05)] bg-[#f5f5f5]'>
					<DefaultUserIcon className='m-auto' />
				</div>
			</div>
			<div
				role='status'
				className='flex items-center justify-center h-[90%] w-[960px] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'
			></div>
		</div>
	);
}
