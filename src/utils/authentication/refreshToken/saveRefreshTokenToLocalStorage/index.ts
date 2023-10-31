export default function saveRefreshTokenToLocalStorage(refresh_token: string) {
	return localStorage.setItem("refresh_token", refresh_token);
}
