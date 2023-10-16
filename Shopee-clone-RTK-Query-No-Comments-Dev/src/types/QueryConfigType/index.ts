import { ProductListQueryParams } from "src/types";

type QueryConfigType = {
	[key in keyof ProductListQueryParams]: string;
};
export default QueryConfigType;

// type QueryConfigType = {
// 	page?: string;
// 	limit?: string;
// 	order?: string;
// 	sort_by?: string;
// 	category?: string;
// 	exclude?: string;
// 	rating_filter?: string;
// 	price_max?: string;
// 	price_min?: string;
// 	name?: string;
// };
// export default QueryConfigType;
