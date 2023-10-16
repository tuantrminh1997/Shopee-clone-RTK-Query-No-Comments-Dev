import { Category, SuccessResponseApi } from "src/types";
import { categoriesBasePathURL } from "src/constants";
import { httpInstance as http } from "src/utils";

// Dữ liệu trả về của Api với pathUrl = /categories
// const a: SuccessResponseApi<Category[]> = {
// 	message: "Lấy categories thành công",
// 	data: [
// 		{
// 			_id: "60aba4e24efcc70f8892e1c6",
// 			name: "Áo thun",
// 		},
// 		{
// 			_id: "60afacca6ef5b902180aacaf",
// 			name: "Đồng hồ",
// 		},
// 		{
// 			_id: "60afafe76ef5b902180aacb5",
// 			name: "Điện thoại",
// 		},
// 	],
// };
// -> Kiểu trả về của method api này là kiểu của biến a
const getCategoriesApi = () => http.get<SuccessResponseApi<Category[]>>(categoriesBasePathURL);
export default getCategoriesApi;
