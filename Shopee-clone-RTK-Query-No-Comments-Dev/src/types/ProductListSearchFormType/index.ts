// schema:
import { productListSearchSchema } from "src/utils";
import * as yup from "yup";

type ProductListSearchFormType = yup.InferType<typeof productListSearchSchema>;
export default ProductListSearchFormType;
