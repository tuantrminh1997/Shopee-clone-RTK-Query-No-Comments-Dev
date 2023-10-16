import * as yup from "yup";

// rule cho form register
const filterPriceSchema = yup.object({
	// nếu chỉ nhập priceMin
	priceMin: yup
		// Ta không set required ở đây -> gây ra type FilterPriceSchema kế thừa lại cấu trúc của schema này có thuộc tính có thể nhận giá trị undefined
		// -> handle việc loại bỏ khả năng bị undefined bằng utils/NoUndefinedField
		.string()
		// object test
		.test({
			name: "Your input price not allowed !",
			message: "Nhập giá không hợp lệ (giá tối đa cần lớn hơn giá tối thiểu, giá tối đa > 0)",
			// nếu sử dụng callback function thì không sử dụng được từ khoá this ở đây
			test(value) {
				const priceMin = value;
				const { priceMax } = this.parent as { priceMin: string; priceMax: string };
				// nếu như nhập cả priceMin và priceMax thì: priceMax > priceMin -> return về true
				if (priceMin !== "" && priceMax !== "") {
					return Number(priceMax) > Number(priceMin);
				}
				// không thì nếu chỉ nhập priceMax hoặc priceMin, thì priceMin >= 0 hoặc priceMax > 0
				return priceMin !== "" || priceMax !== "";
			},
			// -> khi function test return về false -> submit form ta thu được các thông số về lỗi
		}),
	priceMax: yup.string().test({
		name: "Your input price not allowed !",
		message: "Nhập giá không hợp lệ (giá tối đa cần lớn hơn giá tối thiểu)",
		// nếu sử dụng callback function thì không sử dụng được từ khoá this ở đây
		test(value) {
			const priceMax = value;
			const { priceMin } = this.parent as { priceMin: string; priceMax: string };
			// nếu như nhập cả priceMin và priceMax thì: priceMax > priceMin -> return về true
			if (priceMin !== "" && priceMax !== "") {
				return Number(priceMax) > Number(priceMin);
			}
			// không thì nếu chỉ nhập priceMax hoặc priceMin, thì priceMin >= 0 hoặc priceMax > 0
			return priceMin !== "" || (priceMax !== "" && Number(priceMax) > 0);
		},
		// -> khi function test return về false -> submit form ta thu được các thông số về lỗi
	}),
	// priceDefault: yup.string(),
});
// -> Chuyển về type FilterPriceSchema có dạng:
// {
//   priceMin: string,
//   priceMax: string
// }
// -> chuyển vào component AsideFilter và sử dụng
export default filterPriceSchema;
