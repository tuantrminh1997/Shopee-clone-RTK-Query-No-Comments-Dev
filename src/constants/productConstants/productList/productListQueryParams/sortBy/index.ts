const sortBy = {
	// giá trị mặc định của Sort ProductList
	createdAt: "createdAt",
	// Sort ProductList theo Phổ biến
	view: "view",
	// Sort ProductList theo Mới nhất
	sold: "sold",
	// Sort ProductList theo Bán chạy
	price: "price",
} as const;
export default sortBy;
