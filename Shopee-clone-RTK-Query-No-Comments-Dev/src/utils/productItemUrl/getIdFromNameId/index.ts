export default function getIdFromNameId(nameId: string) {
	// Trả về 1 array, gồm các phần tử từ các chuỗi truyền vào ngăn cách bởi -i.
	const array = nameId.split("-i,");
	// trả về phần tử cuối cùng của array = id của Product Item
	return array[array.length - 1];
}
