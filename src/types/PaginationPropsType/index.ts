import { Category, QueryConfigType } from "src/types";

interface PaginationPropsType {
	// currentPage: number;
	// setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	totalPage: number;
	queryConfig: QueryConfigType;
	categoriesData?: Category[];
}
export default PaginationPropsType;
