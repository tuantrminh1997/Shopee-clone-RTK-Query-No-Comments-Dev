export default function getRefreshTokenFromLocalStorage() {
	return localStorage.getItem("refresh_token") || "";
}
