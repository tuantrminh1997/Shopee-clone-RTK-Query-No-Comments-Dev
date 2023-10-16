// method loại bỏ toàn bộ ký tự đặc biệt được nhập tù bàn phím
const removeSpecialCharacter = (name: string) =>
	// eslint-disable-next-line no-useless-escape
	name.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
export default removeSpecialCharacter;
