import { ProductItemSuccessResponse } from "src/types";
interface ProductListSuccessResponse {
	products: ProductItemSuccessResponse[];
	pagination: {
		page: number;
		limit: number;
		page_size: number;
	};
}
export default ProductListSuccessResponse;

// const a = {
// 	message: "Lấy các sản phẩm thành công",
// 	data: {
// 		products: [],
// 		pagination: {
// 			page: 1,
// 			limit: 30,
// 			page_size: 2,
// 		},
// 	},
// };
