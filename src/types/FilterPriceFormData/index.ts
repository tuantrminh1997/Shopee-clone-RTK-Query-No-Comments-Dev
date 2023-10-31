import { filterPriceSchema, NoUndefinedField } from "src/utils";
import * as yup from "yup";

type FilterPriceFormData = NoUndefinedField<yup.InferType<typeof filterPriceSchema>>;
export default FilterPriceFormData;
