export default function SkeletonLoadingProductItem() {
	return (
		<div
			role='status'
			className='flex flex-col my-[5px] px-[5px] w-[20%] rounded-sm shadow-md outline-none max-h-[400px] hover:shadow-xl hover:mt-[2px] hover:mb-[8px] cursor-pointer basis-[calc(100%/5)] transition-all'
		>
			<div className='flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700 mb-10'>
				<svg
					className='w-10 h-10 text-gray-200 dark:text-gray-600'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='currentColor'
					viewBox='0 0 20 18'
				>
					<path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
				</svg>
			</div>
			<div role='status' className='space-y-2.5 animate-pulse max-w-lg'>
				<div className='flex items-center w-full space-x-2'>
					<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32' />
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24' />
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full' />
				</div>
				<div className='flex items-center w-full space-x-2 max-w-[480px]'>
					<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full' />
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full' />
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24' />
				</div>
				<div className='flex items-center w-full space-x-2 max-w-[400px]'>
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full' />
					<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80' />
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full' />
				</div>
				<div className='flex items-center w-full space-x-2 max-w-[480px]'>
					<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full' />
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full' />
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24' />
				</div>
				<div className='flex items-center w-full space-x-2 max-w-[440px]'>
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32' />
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24' />
					<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full' />
				</div>
				<div className='flex items-center w-full space-x-2 max-w-[360px]'>
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full' />
					<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80' />
					<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full' />
				</div>
			</div>
		</div>
	);
}
