// classNames:
import classNames from "classnames";
// react - router - dom:
import { createSearchParams } from "react-router-dom";
// constants
import { paths } from "src/constants";
// icons:
import { NextIcon, PreviousIcon } from "src/icons";
// common components:
import { Button } from "src/components";
// types:
import { PaginationPropsType } from "src/types";

// Tổng quan thuật toán áp dụng cho chức năng render số trang: -> xem tại md 4

export default function Pagination({ totalPage, queryConfig }: PaginationPropsType) {
	const currentPage = Number(queryConfig.page);
	const renderPaginationPages: () => React.ReactNode = () => {
		const range: number = 2;
		let dotAfter: boolean = false;
		let dotBefore: boolean = false;
		// Method quản lý việc render dot before và after:
		const renderDotAfter = (index: number) => {
			if (!dotAfter) {
				dotAfter = true;
				return (
					<Button
						// chuyển thành thẻ span
						Element={"span"}
						key={index}
						className='w-10 md:w-3 h-[30px] mx-4 flex items-center justify-center rounded-sm border-none outline-none'
						childrenClassName={"m-auto text-[#00000066] text-[25px]"}
					>
						...
					</Button>
				);
			}
			return null;
		};
		const renderDotBefore = (index: number) => {
			if (!dotBefore) {
				dotBefore = true;
				return (
					<Button
						// chuyển thành thẻ span
						Element={"span"}
						key={index}
						className='w-10 md:w-3 h-[30px] mx-4 flex items-center justify-center rounded-sm border-none outline-none'
						childrenClassName={"m-auto text-[#00000066] text-[25px]"}
					>
						...
					</Button>
				);
			}
			return null;
		};

		return Array(totalPage)
			.fill(0)
			.map((_, index) => {
				const pageNumber = index + 1;
				// Trường hợp 1 của thuật toán: dấu 3 chấm chỉ xuất hiện ở phía sau currentPage, điều kiện = đọc code
				if (currentPage <= range * 2 + 1 && pageNumber > currentPage + range && pageNumber < totalPage - range + 1) {
					return renderDotAfter(index);
				}
				// trường hợp 2 của thuật toán: dấu 3 chấm xuất hiện ở cả phía trước lẫn phía sau currentPage
				// Nhóm điều kiện 1: để bắt đầu xuất hiện dấu 3 chấm cả đằng trước lẫn đằng sau:
				//   1. trang hiện tại > range x 2 + 1 (ví dụ: trang hiện tại là số 6 > range = 2 x 2 + 1 = 5)
				// -> bắt đầu xuất hiện dấu 3 chấm đằng trước.
				// 2. trang hiện tại < totalPage - range x 2 (ví dụ: trang hiện tại là số 6 < totalPage = 20 - range = 2 x 2 = 16)
				// -> bắt đầu xuất hiện dấu 3 chấm đằng sau.
				if (currentPage > range * 2 + 1 && currentPage < totalPage - range * 2) {
					// sau khi vượt qua nhóm điều kiện 1:
					// -> đi vào nhóm điều kiện 2:
					// 1. Điều kiện để số trang đằng trước currentPage bị thay = dấu 3 chấm:
					//    1.1. Nếu số trang đó < trang hiện tại - range
					//    1.2. số trang đó > range
					// - (ví dụ số trang = 3 < trang hiện tại là   6 - 2 = 4 && số trang đó = 3 > range = 2)
					//   -> từ trang đó đổ về trước bị thay = dấu 3 chấm đằng trước -> return về renderDotBefore(index)
					if (pageNumber < currentPage - range && pageNumber > range) {
						return renderDotBefore(index);
					} else if (pageNumber > currentPage + range && pageNumber < totalPage - range + 1) {
						// 2. Điều kiện để số trang đằng sau currentPage bị thay = dấu 3 chấm:
						//    2.2. Nếu số trang đó > trang hiện tại + range
						//    2.1. Nếu số trang đó < tổng số trang - range + 1
						// - (ví dụ trang đó là 10 > trang hiện tại = 6 + range = 2 = 8 && số trang đó = 10 < tổng số trang = 20 - range = 2 + 1 = 20 - 2 + 1 = 19).
						//   -> từ trang đó đổ ra sau bị thay bằng dấu 3 chấm -> return về renderDotAfter(index)
						return renderDotAfter(index);
					}
				}
				// trường hợp 3 của thuật toán: dấu 3 chấm chỉ xuất hiện ở đằn trước current Page,
				// -> điều kiện:
				// 1. trang hiện tại >= tổng số trang - range x 2
				// (ví dụ trang hiện tại = 16 >= tổng số trang = 20 - range = 2 x 2 = 20 - 2 x 2 = 16 -> 16 = 16)
				// 2. số trang đó > range (Ví dụ số trang đó = 13 > range = 2)
				// 3. số trang đó < trang hiện tại - range (số trang đó = 13 < trang hiện tại = 16 - range = 2 = 16 - 2 = 14)
				// -> từ trang đó đổ về trước bị thay bằng dấu 3 chấm -> return renderDotBefore(index)
				if (currentPage >= totalPage - range * 2 && pageNumber > range && pageNumber < currentPage - range) {
					return renderDotBefore(index);
				}
				// Ở trên là toàn bộ khối điều kiện để render ra dấu 3 chấm
				// nếu không lọt vào vùng điều kiện trên -> lọt vào vùng bên dưới để render ra number
				return (
					<Button
						key={index}
						// truyền to -> trở thành Link
						// sau khi trở thành Link -> mục đích ta cần khi click -> bắn khối string có dạng: /?[chuỗi các query params và giá trị, nối nhau bởi dấu &]
						// Lý do vì sao thì ngay từ đầu bài toán (xem tại md 5), ta đã thống nhất sẽ quản lý dữ liệu chức năng phân trang, filter trực tiếp qua url thay vì state.
						to={{
							// 1. đầu tiên là 1 url có dạng /
							pathname: paths.defaultPath,
							// 2. tiếp theo cần nối: ?[query params và giá trị, ngăn cách nhau bởi &]
							// -> createSearchParams nhận vào 1 object và trả về chuỗi URLSearchParams, có dạng của khối query params+giá trị mà ta đang cần
							// -> tiếp tục chuyển nó về string (toString()) và sử dụng.
							search: createSearchParams({
								...queryConfig,
								page: pageNumber.toString(),
							}).toString(),
						}}
						// Thẻ Link: nhấn vào thẻ Link -> bắn khối url /?[query params.....]?[...] lên thanh url
						className={classNames(
							"w-10 md:w-5 h-[30px] mx-4 flex items-center justify-center rounded-sm border-none outline-none",
							{
								"bg-[#EE4D2D]": pageNumber === currentPage,
							},
						)}
						childrenClassName={classNames("m-auto text-[#00000066] ", {
							"text-white": pageNumber === currentPage,
						})}
						// onClick={() => setCurrentPage(pageNumber)}
					>
						{pageNumber}
						{/* <Link to='/121'></Link> */}
					</Button>
				);
			});
	};
	// lg:sticky lg:bottom-0 lg:left-0 lg:right-0 lg:mb-0 lg:h-[13vh] lg:bg-[rgba(0,0,0,.09)]
	return (
		<div className='mb-10 flex justify-center w-full lg:z-[999]'>
			<div className='flex items-center justify-center flex-wrap md: max-w-[90%]'>
				{currentPage === 1 ? (
					<Button className='w-10 md:w-3 h-[30px] flex mr-4 my-[2px]' childrenClassName={"m-auto"} disabled>
						<PreviousIcon width='14px' height='14px' fill='rgba(0,0,0,.1)' />
					</Button>
				) : (
					<Button
						to={{
							pathname: paths.defaultPath,
							search: createSearchParams({
								...queryConfig,
								page: (currentPage - 1).toString(),
							}).toString(),
						}}
						className='w-10 md:w-3 h-[30px] flex mr-4 my-[2px]'
						childrenClassName={"m-auto"}
					>
						<PreviousIcon width='14px' height='14px' fill='rgba(0,0,0,.4)' />
					</Button>
				)}
				{renderPaginationPages()}
				{currentPage === totalPage ? (
					<Button className='w-10 md:w-3 h-[30px] flex mr-4 my-[2px]' childrenClassName={"m-auto"} disabled>
						<NextIcon width='14px' height='14px' fill='rgba(0,0,0,.1)' />
					</Button>
				) : (
					<Button
						to={{
							pathname: paths.defaultPath,
							search: createSearchParams({
								...queryConfig,
								page: (currentPage + 1).toString(),
							}).toString(),
						}}
						className='w-10 md:w-3 h-[30px] ml-4 flex my-[2px]'
						childrenClassName={"m-auto"}
					>
						<NextIcon width='14px' height='14px' fill='rgba(0,0,0,.4)' />
					</Button>
				)}
			</div>
		</div>
	);
}
