// import path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:jsx-a11y/recommended",
		"plugin:@typescript-eslint/recommended",
		"eslint-config-prettier",
		"prettier",
		"plugin:storybook/recommended",
	],
	plugins: ["prettier"], // Sử dụng plugin Prettier để tích hợp với ESLint
	settings: {
		react: {
			version: "detect", // Cho phép eslint-plugin-react tự động xác định phiên bản React
		},
		/**
		 * Bạn đang cung cấp cài đặt cho plugin eslint-plugin-import, cho phép bạn kiểm tra và quản lý việc import và export của tệp trong mã của bạn.
		 */
		"import/resolver": {
			/**
       *** Trong cấu hình ESLint, bạn có thể sử dụng một plugin gọi là eslint-plugin-import để kiểm tra cách bạn đang import và export các tệp 
       * (file) trong mã của bạn. Để làm việc này, plugin này cần biết cách xử lý các import và export, bao gồm việc tìm kiếm các tệp và xác 
       * định cách chúng tương tác với môi trường.
       *** Trong plugin eslint-plugin-import, có một khái niệm gọi là "trình giải quyết" (resolver). Mỗi trình giải quyết giúp xác định cách 
       plugin xử lý việc import và export dựa trên môi trường cụ thể. Trong trường hợp của bạn, bạn đang sử dụng trình giải quyết có tên là 
       "node".
        *** Trình giải quyết "node" trong eslint-plugin-import được sử dụng để xác định cách mã của bạn import và export tệp từ môi trường 
        Node.js. Nó cung cấp các tùy chọn để plugin biết cách tìm kiếm các tệp và xử lý các thư viện, module trong mã của bạn. Điều này giúp 
        bạn đảm bảo rằng mã của bạn được viết và xử lý một cách đúng đắn và theo quy tắc khi liên quan đến việc import và export các tệp trong 
        môi trường Node.js.

        --> Tóm lại, đoạn mã này yêu cầu plugin eslint-plugin-import kiểm tra tất cả các tệp có phần mở rộng .js, .jsx, .ts, và .tsx nằm trong 
        thư mục gốc của dự án để đảm bảo rằng các cài đặt và quy tắc liên quan đến việc import và export, cũng như việc kiểm tra lỗi, được 
        thực thi đúng cách.
       */
			node: {
				/**
				 * paths: [path.resolve(__dirname, "")]: Điều này xác định đường dẫn mà eslint-plugin-import sẽ sử dụng để tìm kiếm các tệp được
				 * import. Trong trường hợp này, nó sẽ tìm kiếm trong thư mục gốc của dự án.
				 */
				paths: [path.resolve(__dirname, "")],
				/**
				 * Chú ý: ta có thể đặt đường dẫn tìm kiếm tương đối ở đây paths: ["."]
				 * -> tuy nhiên làm thế này thì dễ gây lỗi vì eslint ko nhận diện được đường dẫn
				 */
				// paths: ["."],
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
	env: {
		node: true, // Xác định rằng mã được viết cho môi trường Node.js
	},
	rules: {
		/**
		 *  Tắt cảnh báo yêu cầu phải import React trong các tệp JSX. Điều này là cần thiết khi bạn đang sử dụng phiên bản React mới hơn
		 * (17 trở lên) mà không cần phải import React.
		 */
		"react/react-in-jsx-scope": "off",
		/**
		 * "react/jsx-no-target-blank": "warn": Cảnh báo khi bạn sử dụng thẻ <a> với thuộc tính target='_blank' mà không có thuộc tính
		 * rel='noreferrer'. Thuộc tính rel='noreferrer' được sử dụng để bảo mật trong việc mở các liên kết trong cửa sổ mới.
		 */
		"react/jsx-no-target-blank": "warn",
		"prettier/prettier": [
			"warn",
			{
				arrowParens: "always",
				semi: true,
				trailingComma: "all",
				tabWidth: 2,
				endOfLine: "auto",
				useTabs: true,
				singleQuote: false,
				printWidth: 150,
				jsxSingleQuote: true,
			},
		], // Áp dụng các cài đặt định dạng từ Prettier
	},
};

/**
 * Khi bạn chạy lệnh yarn lint, điều sau sẽ xảy ra:

1. ESLint sẽ đọc cấu hình từ tệp .eslintrc.cjs để biết cách kiểm tra và định dạng mã.
2. ESLint sẽ sử dụng cấu hình và các rule đã được định nghĩa trong tệp .eslintrc.cjs để kiểm tra tất cả các tệp có phần mở rộng .ts và .tsx 
trong thư mục src/ của dự án của bạn, Trong quá trình kiểm tra, ESLint sẽ sử dụng danh sách từ .eslintignore để biết những gì nên bỏ qua.
3. Khi ESLint phát hiện các lỗi hoặc cảnh báo về việc không tuân theo cấu hình chi tiết, nó sẽ hiển thị chúng ra trong kết quả khi bạn chạy 
lệnh yarn lint.
-> Tương tự, khi bạn chạy lệnh yarn lint:fix, ESLint sẽ thử sửa chữa các lỗi cơ bản tự động dựa trên cấu hình bạn đã thiết lập, như định dạng 
mã theo Prettier, và áp dụng sửa đổi lên các tệp có phần mở rộng .ts và .tsx trong thư mục src/.
 */
