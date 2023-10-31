import { SuccessResponseApi, ProductListSuccessResponse } from "src/types";

interface TopSellingProductListPropsType {
	similarSoldByProductListQueryData: SuccessResponseApi<ProductListSuccessResponse>;
	topPicksTitle: string;
}
export default TopSellingProductListPropsType;
