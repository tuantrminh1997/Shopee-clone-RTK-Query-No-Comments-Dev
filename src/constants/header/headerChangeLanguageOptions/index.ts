import { headerTextNodes } from "src/constants";
// types;
import { HeaderChangeLanguageOptionsType } from "src/types";

const { englishTitle, vietnameseTitle } = headerTextNodes;

const headerChangeLanguageOptions: HeaderChangeLanguageOptionsType = [
	{
		containerClassName: "popoverLanguagesOptionContainerStyles",
		innerClassName: "popoverLanguagesOptionItemStyles",
		title: vietnameseTitle,
		targetLanguage: "vietnamese",
	},
	{
		containerClassName: "popoverLanguagesOptionContainerStyles",
		innerClassName: "popoverLanguagesOptionItemStyles",
		title: englishTitle,
		targetLanguage: "english",
	},
];
export default headerChangeLanguageOptions;
