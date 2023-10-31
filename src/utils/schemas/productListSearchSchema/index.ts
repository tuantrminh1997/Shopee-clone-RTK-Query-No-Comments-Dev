import * as yup from "yup";

const productListSearchSchema = yup.object({
	productListSearchForm: yup.string().trim().required("Chú ý: Nhập ký tự liên quan tới tên sản phẩm cần tìm"),
	//
});
export default productListSearchSchema;
