import { Category, SuccessResponseApi } from "src/types";
import { categoriesBasePathURL } from "src/constants";
import { httpInstance as http } from "src/utils";

const getCategoriesApi = () => http.get<SuccessResponseApi<Category[]>>(categoriesBasePathURL);
export default getCategoriesApi;
