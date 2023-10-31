/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				orange: "#ee4d2d",
			},
		},
		screens: {
			"2xl": { max: "1535px" },
			// => @media (max-width: 1535px) { ... }
			xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }
			lg: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }
			md: { max: "767px" },
			// => @media (max-width: 767px) { ... }
			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }
			lowMobile: { max: "556px" },
			lowerMobile: { max: "365px" },
		},
	},
	plugins: [
		// copy cú pháp tại: tailwindcss/docs/plugins
		plugin(function ({ addComponents, theme }) {
			// Add your custom styles here
			// Ta custome ra 1 thuộc tính container bao gồm:
			// maxWidth = 80rem
			// marginLeft = marginRight = auto -> căn giữa ngang
			// paddingLeft = paddingRight = 1rem
			addComponents({
				// container dùng cho RegisterLayoutHeader, Footer, Register Page, Login Page
				".container": {
					// sử dụng theme: spacing -> tra cứu tại tailwindcss -> Customization -> Configuration -> default configuration
					// maxWidth = theme("columns.7xl") 80rem
					maxWidth: theme("columns.7xl"),
					marginLeft: "auto",
					marginRight: "auto",
					paddingLeft: "1rem",
					paddingRight: "1rem",
				},
				".containerHeaderCartLayout": {
					// sử dụng theme: spacing -> tra cứu tại tailwindcss -> Customization -> Configuration -> default configuration
					// maxWidth = theme("columns.7xl") 80rem
					width: "1200px",
					justifyContent: "center",
				},
				// Style cho thẻ div cha ôm toàn bộ khối Popover của vùng MyAccount - Header Component
				".popoverContentMyAccountContainerStyle": {
					boxShadow: "0 0.0625rem 3.125rem 0 rgba(0,0,0,.2)",
					backgroundColor: "white",
					position: "relative",
					borderRadius: "2px",
					cursor: "pointer",
					borderColor: "gray",
				},
				// Style cho thẻ div cha ôm toàn bộ khối Popover của vùng Language - Header Component
				".popoverContentLanguagesContainerStyle": {
					boxShadow: "0 0.0625rem 3.125rem 0 rgba(0,0,0,.2)",
					backgroundColor: "white",
					minWidth: "12.5rem",
					borderRadius: "2px",
					position: "relative",
					cursor: "pointer",
					borderColor: "gray",
					// zIndex: 50,
				},
				// Style cho thẻ div cha ôm toàn bộ khối Popover của vùng Cart - Header Component
				".popoverContentCartContainerStyle": {
					boxShadow: "0 0.0625rem 3.125rem 0 rgba(0,0,0,.2)",
					paddingLeft: "15px",
					paddingRight: "15px",
					color: "white",
					background: "#ee4d2d",
					overflow: "visible",
					"&:hover": {
						backgroundColor: "#f05d40",
					},
				},
				// Component PopoverOption có 2 thành phần:
				// + 1 thẻ cha (button, Link, a): -> styles cho thẻ cha của Option vùng MyAccount - Component Header
				".popoverMyAccountOptionContainerStyles": {
					paddingLeft: "0.9375rem",
					display: "flex",
					alignItems: "center",
					height: "2.5rem",
					width: "9.375rem",
					fontSize: "0.875rem",
					lineHeight: "1.25rem",
					textAlign: "left",
					"&:hover": {
						backgroundColor: "#fafafa",
						color: "#00bfa5",
					},
				},
				// Component PopoverOption có 2 thành phần:
				// + 1 thẻ cha (button, Link, a): -> styles cho thẻ cha của Option vùng Language - Component Header
				".popoverLanguagesOptionContainerStyles": {
					outline: "none",
					textAlign: "left",
					padding: "0.625rem",
					fontSize: "0.875rem",
					lineHeight: "1.25rem",
					display: "flex",
					alignItems: "center",
				},
				// Component PopoverOption có 2 thành phần:
				// + 1 thẻ cha (button, Link, a):
				// + 1 thẻ con (span): -> style cho thẻ con của Popover Option vùng Language - Component Header
				".popoverLanguagesOptionItemStyles": {
					textTransform: "capitalize",
					"&:hover": {
						color: "#ee4d2d",
					},
				},
				".popoverSortPriceOptionContainerStyles": {
					outline: "none",
					textAlign: "left",
					padding: "0.625rem",
					fontSize: "0.875rem",
					lineHeight: "1.25rem",
					display: "flex",
					alignItems: "center",
				},
				// Component PopoverOption có 2 thành phần:
				// + 1 thẻ cha (button, Link, a):
				// + 1 thẻ con (span): -> style cho thẻ con của Popover Option vùng Language - Component Header
				".popoverSortPriceOptionItemStyles": {
					paddingLeft: "2px",
					paddingRight: "2px",
					paddingBottom: "2px",
					width: "100%",
					"&:hover": {
						color: "#ee4d2d",
					},
				},
				// Component PopoverOption có 2 thành phần:
				// + 1 thẻ cha (button, Link, a):
				// + 1 thẻ con (span): -> style cho thẻ con của Popover Option vùng MyAccount - Component Header
				".popoverMyAccountOptionItemStyles": {
					textTransform: "capitalize",
					padding: "4px",
					margin: "-4px",
				},
				".headerInputFormBoxShadow": {
					boxShadow: "0 0.125rem 0.25rem rgba(0,0,0,.09)",
				},
				".cartPageBoxShadow1": {
					boxShadow: "0 1px 1px 0 rgba(0,0,0,.05)",
				},
				// profile input box-shadow
				".profileInputBoxShadow": {
					boxShadow: "inset 0 2px 0 rgba(0,0,0,.02)",
				},
				".profileUploadAvatarButtonBoxShadow": {
					boxShadow: "0 1px 1px 0 rgba(0,0,0,.03)",
				},
				".myProfileBoxShadow": {
					boxShadow: "0 1px 2px 0 rgba(0,0,0,.13)",
				},
				// myAccount navbr transform styles
				".myAccountNavbarActive": {
					opacity: "1",
					height: "auto",
				},
				".myAccountNavbarTransition": {
					transition: "height .4s cubic-bezier(.4,0,.2,1),opacity .4s cubic-bezier(.4,0,.2,1)",
				},
				".myAccountNavbarHide": {
					opacity: "0",
					height: "0",
				},
				".purchaseListContentBoxShadow": {
					boxShadow: "0 1px 1px 0 rgba(0,0,0,.05)",
				},
			});
		}),
	],
};
