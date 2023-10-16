import * as yup from "yup";

// rule cho form product list search
const productListSearchSchema = yup.object({
	// rule cho email
	productListSearchForm: yup
		.string()
		// trim() -> form chỉ ghi nhận ký tự khác dấu space làm giá trị thực
		// -> đồng nghĩa rằng khi ta cố tình nhập toàn dấu space và submit -> hàm handleSubmit (useForm()) form không được gọi
		.trim()
		// Bắt buộc nhập tên sản phẩm tìm kiếm
		.required("Chú ý: Nhập ký tự liên quan tới tên sản phẩm cần tìm"),
	//
});
export default productListSearchSchema;
