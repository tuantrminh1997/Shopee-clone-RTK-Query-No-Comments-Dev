// react router dom
import { useNavigate, Link, createSearchParams } from "react-router-dom";
// lodash
import omit from "lodash/omit";
// custome hooks
import { useQueryConfig } from "src/hooks";
// icons:
import { RightArrowBreadCrumIcon } from "src/icons";
// constants
import { paths, productItemAttributes } from "src/constants";
// types
import { BreadCrumPropsType } from "src/types";

export default function BreadCrum({ productItemName, productItemCategory, categoryId }: BreadCrumPropsType) {
	const { shopeeTitle } = productItemAttributes;
	const { productList } = paths;
	const navigate = useNavigate();
	const queryConfig = useQueryConfig();

	// Method quản lý sắp xếp theo Phổ biến, Mới nhất, Bán chạy
	// -> ghi đè object queryConfig: + thuộc tính sort_by
	const handleSortCategorySold: () => void = () => {
		// Bắn khối url lên thanh url -> thu vào object queryConfig -> call API get List
		navigate({
			pathname: paths.defaultPath,
			search: createSearchParams(
				omit(
					{
						// Tiến hành ghi đè giá trị mới của thuộc tính sort_by trong object queryConfig bằng giá trị sortByValue được truyền vào
						...queryConfig,
						sort_by: "view",
						category: categoryId,
						// chuyển từ URLSearchParams sang string để phù hợp với giá trị mong muốn của thuộc tính search
					},
					["order"],
				),
			).toString(),
		});
	};
	return (
		<div className='w-full h-5 border pb-7 flex items-center justify-start text-[13px] text-[#0055AA] self-start lg:pl-4 lg:mt-3 lowerMobile:mb-3'>
			<Link to={productList} className='mr-2 capitalize'>
				{shopeeTitle}
			</Link>
			<span className='mr-2'>
				<RightArrowBreadCrumIcon />
			</span>
			<span
				onClick={handleSortCategorySold}
				className='mr-2 capitalize cursor-pointer lg:min-w-[50px]'
				aria-hidden='true'
			>
				{productItemCategory}
			</span>
			<span className='mr-2'>
				<RightArrowBreadCrumIcon />
			</span>
			<p className='text-sm text-[#000000CC] capitalize'>{productItemName}</p>
		</div>
	);
}
