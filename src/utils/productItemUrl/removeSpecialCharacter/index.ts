const removeSpecialCharacter = (name: string) =>
	// eslint-disable-next-line no-useless-escape
	name.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
export default removeSpecialCharacter;
