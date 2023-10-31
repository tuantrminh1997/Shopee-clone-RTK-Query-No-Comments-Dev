import { AxiosError } from "axios";
import { describe, it, expect } from "vitest";
import isAxiosErrorTypePredicateMethod from "src/utils/typePredicates/isAxiosErrorTypePredicateMethod";

// describe dùng để mô tả tập hợp các ngữ cảnh
// hoặc 1 đơn vị cần test: Ví dụ function, component
describe("isAxiosErrorTypePredicateMethod", () => {
	// it dùng để ghi chú trường hợp cần test
	it("isAxiosError trả về boolean", () => {
		// expect dùng để mong đợi giá trị trả về
		expect(isAxiosErrorTypePredicateMethod(new Error())).toBe(false);
		expect(isAxiosErrorTypePredicateMethod(new AxiosError())).toBe(true);
	});
});
