const getFileExtension: (mimeType: string) => string | null = (mimeType: string) => {
	const parts = mimeType.split("/");
	if (parts.length === 2) {
		const extension = parts[1];
		return extension.toUpperCase();
	}
	return null;
};
export default getFileExtension;
