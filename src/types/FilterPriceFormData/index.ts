import { filterPriceSchema, NoUndefinedField } from "src/utils";
import * as yup from "yup";

// loại bỏ type undefined của 2 thuộc tính priceMin, priceMax trong type FilterPriceFormData bằng type NoUndefinedField<đặt type/interface vào đây>
type FilterPriceFormData = NoUndefinedField<yup.InferType<typeof filterPriceSchema>>;
export default FilterPriceFormData;
