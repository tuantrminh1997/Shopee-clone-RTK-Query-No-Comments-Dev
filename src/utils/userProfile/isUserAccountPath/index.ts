const isUserAccountPath: (path: string) => boolean = (path: string) => {
	// Sử dụng biểu thức chính quy để kiểm tra chuỗi
	const regex = /^\/user\/account\/.*/;
	return regex.test(path);
};
export default isUserAccountPath;
