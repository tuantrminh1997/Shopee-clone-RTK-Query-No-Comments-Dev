// lodash:
import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";
// types
import { QueryConfigType } from "src/types";
// custome hooks
import { useQueryParams } from "src/hooks";

export default function useQueryConfig() {
	const productListQueryParams: QueryConfigType = useQueryParams();
	const queryConfig: QueryConfigType = omitBy(
		{
			page: productListQueryParams.page || "1",
			limit: productListQueryParams.limit || "20",
			order: productListQueryParams.order,
			sort_by: productListQueryParams.sort_by,
			category: productListQueryParams.category,
			exclude: productListQueryParams.exclude,
			rating_filter: productListQueryParams.rating_filter,
			price_max: productListQueryParams.price_max,
			price_min: productListQueryParams.price_min,
			name: productListQueryParams.name,
		},
		isUndefined,
	);
	return queryConfig;
}
