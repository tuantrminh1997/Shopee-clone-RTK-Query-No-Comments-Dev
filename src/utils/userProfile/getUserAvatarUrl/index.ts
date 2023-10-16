import { paths } from "src/constants";
import noAvatar from "src/assets/no-avatar.jpg";

const getUserAvatarUrl: (avatarNameResponse: string) => string = (avatarNameResponse: string) =>
	avatarNameResponse ? `${paths.baseURL}images/${avatarNameResponse}` : noAvatar;
export default getUserAvatarUrl;
