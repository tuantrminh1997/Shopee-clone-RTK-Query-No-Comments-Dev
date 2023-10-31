const getUserProfileFromLocalStorage = () => {
	const result = localStorage.getItem("userProfile");
	return result ? JSON.parse(result) : null;
};
export default getUserProfileFromLocalStorage;
