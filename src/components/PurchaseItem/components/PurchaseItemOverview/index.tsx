// assets:
import shopeeIconImg from "src/assets/shopee-img-logo.png";
// react router dom
import { Link } from "react-router-dom";
// constants:
import { paths } from "src/constants";
// common components
import { generateNameIdStringUrl } from "src/utils";

interface PurchaseItemOverviewPropsType {
	extendPurchaseItemImageSrc?: string;
	extendPurchaseItemName?: string;
	extendPurchaseItemProductId?: string;
}

export default function PurchaseItemOverview({
	extendPurchaseItemImageSrc: imgageSrc,
	extendPurchaseItemName: name,
	extendPurchaseItemProductId: id,
}: PurchaseItemOverviewPropsType) {
	const { productList: productListUrl } = paths;
	return (
		<div className='flex h-full justify-start items-center sm:justify-center sm:flex-1'>
			<Link to={`${productListUrl}${generateNameIdStringUrl({ name: name as string, id: id as string })}`}>
				<img className='w-[150px] h-[150px] mr-3' src={imgageSrc} alt='extendPurchaseItemImageSrc' />
			</Link>
			<div className='flex flex-col justify-start basis-[60%] sm:hidden'>
				<Link to={`${productListUrl}${generateNameIdStringUrl({ name: name as string, id: id as string })}`}>
					{name} (ảnh thật)
				</Link>
				<div className='flex-1'>
					<img className='h-5' src={shopeeIconImg} alt='shopeeImgIcon' />
				</div>
			</div>
		</div>
	);
}
