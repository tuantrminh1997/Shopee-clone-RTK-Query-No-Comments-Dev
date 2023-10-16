import { removeSpecialCharacter } from "src/utils";
import { GenerateNameIdStringUrlPropsType } from "src/types";

export default function generateNameIdStringUrl({ name, id }: GenerateNameIdStringUrlPropsType): string {
	// -> loại bỏ các ký tự đặc biệt trong Product Name nếu có
	// -> thay thế dấu space thay bằng -
	// -> nối thêm -i. và ProductId
	return `${removeSpecialCharacter(name).replace(/\s/g, "-")}-i,${id}`;
}
