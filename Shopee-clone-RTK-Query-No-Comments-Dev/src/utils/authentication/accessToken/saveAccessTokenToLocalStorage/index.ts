export default function saveAccessTokenToLocalStorage(access_token: string) {
	return localStorage.setItem("access_token", access_token);
}
