const getTruthyImageFileSize: (currentFileSize: number, maxFileSize: number) => boolean = (
	currentFileSize: number,
	maxFileSize: number,
) => currentFileSize <= maxFileSize;
export default getTruthyImageFileSize;
