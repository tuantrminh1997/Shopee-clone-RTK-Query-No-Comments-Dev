import { ProductListSuccessResponse, SuccessResponseApi } from "src/types";

interface RelatedInformationsPropsType {
	similarProductListQueryData: SuccessResponseApi<ProductListSuccessResponse>;
	productItemDescription: string;
	similarSoldByProductListQueryData: SuccessResponseApi<ProductListSuccessResponse>;
}
export default RelatedInformationsPropsType;
