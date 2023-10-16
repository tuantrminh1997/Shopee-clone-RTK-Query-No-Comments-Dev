export default function clearRefreshTokenFromLocalStorage() {
	localStorage.removeItem("refresh_token");
}
