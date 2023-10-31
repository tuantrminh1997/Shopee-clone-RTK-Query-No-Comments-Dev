import { removeSpecialCharacter } from "src/utils";
import { GenerateNameIdStringUrlPropsType } from "src/types";

export default function generateNameIdStringUrl({ name, id }: GenerateNameIdStringUrlPropsType): string {
	return `${removeSpecialCharacter(name).replace(/\s/g, "-")}-i,${id}`;
}
