import { myAccountUploadUserAvatarConstants } from "src/constants";

const { MbAsBytes } = myAccountUploadUserAvatarConstants;
const getCurrentFileSizeAsMB: (currentFileSizeAsBytes: number) => string = (currentFileSizeAsBytes: number) =>
	((currentFileSizeAsBytes as number) / MbAsBytes).toFixed(2);
export default getCurrentFileSizeAsMB;
