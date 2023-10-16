// types
import { ProductListSuccessResponse, SuccessResponseApi } from "src/types";

interface SimilarProductListPropsType {
	similarProductListQueryData: SuccessResponseApi<ProductListSuccessResponse>;
	youMayAlsoLikeTitle: string;
}
export default SimilarProductListPropsType;
