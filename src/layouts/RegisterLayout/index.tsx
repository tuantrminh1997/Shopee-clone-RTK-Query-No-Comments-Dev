// react hooks:
import { memo } from "react";
// react router dom
import { Outlet } from "react-router-dom";
// types:
import { RegisterLayoutPropsType } from "src/types";
// components:
import { RegisterLayoutHeader } from "./components";
import { Footer } from "src/components";

function RegisterLayoutInner({ children }: RegisterLayoutPropsType) {
	return (
		<div>
			<RegisterLayoutHeader />
			{children}
			<Outlet />
			<Footer />
		</div>
	);
}
const RegisterLayout = memo(RegisterLayoutInner);
export default RegisterLayout;
