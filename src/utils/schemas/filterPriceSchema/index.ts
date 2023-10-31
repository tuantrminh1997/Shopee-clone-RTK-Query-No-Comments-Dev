import * as yup from "yup";

const filterPriceSchema = yup.object({
	priceMin: yup.string().test({
		name: "Your input price not allowed !",
		message: "Nhập giá không hợp lệ (giá tối đa cần lớn hơn giá tối thiểu, giá tối đa > 0)",
		test(value) {
			const priceMin = value;
			const { priceMax } = this.parent as { priceMin: string; priceMax: string };
			if (priceMin !== "" && priceMax !== "") {
				return Number(priceMax) > Number(priceMin);
			}
			return priceMin !== "" || priceMax !== "";
		},
	}),
	priceMax: yup.string().test({
		name: "Your input price not allowed !",
		message: "Nhập giá không hợp lệ (giá tối đa cần lớn hơn giá tối thiểu)",
		test(value) {
			const priceMax = value;
			const { priceMin } = this.parent as { priceMin: string; priceMax: string };
			if (priceMin !== "" && priceMax !== "") {
				return Number(priceMax) > Number(priceMin);
			}
			return priceMin !== "" || (priceMax !== "" && Number(priceMax) > 0);
		},
	}),
});
export default filterPriceSchema;
