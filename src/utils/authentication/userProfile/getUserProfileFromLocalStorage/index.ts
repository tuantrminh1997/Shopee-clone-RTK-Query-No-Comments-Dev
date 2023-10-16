const getUserProfileFromLocalStorage = () => {
	// Nếu để JSON.parse(localStorage.getItem("userProfile")) -> gây ra vấn đề là trong trường hợp là null sẽ không parse được
	// handle bằng cách lưu vào 1 biến và return về null trong trường hợp biến đó trống.
	const result = localStorage.getItem("userProfile");
	return result ? JSON.parse(result) : null;
};
export default getUserProfileFromLocalStorage;
