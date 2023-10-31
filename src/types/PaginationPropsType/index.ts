import { Category, QueryConfigType } from "src/types";

interface PaginationPropsType {
	totalPage: number;
	queryConfig: QueryConfigType;
	categoriesData?: Category[];
}
export default PaginationPropsType;
