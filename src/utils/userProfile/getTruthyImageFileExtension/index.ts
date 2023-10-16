const getTruthyImageFileExtension = (imageFileExtension: string) =>
	imageFileExtension === "JPEG" || imageFileExtension === "PNG";

export default getTruthyImageFileExtension;
