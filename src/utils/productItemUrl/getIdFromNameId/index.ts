export default function getIdFromNameId(nameId: string) {
	const array = nameId.split("-i,");
	return array[array.length - 1];
}
