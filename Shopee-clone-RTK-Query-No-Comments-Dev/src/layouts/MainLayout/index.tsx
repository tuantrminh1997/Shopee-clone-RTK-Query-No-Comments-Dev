// react hooks:
import { memo } from "react";
// react router dom
import { Outlet } from "react-router-dom";
// types:
import { RegisterLayoutPropsType } from "src/types";
// common components:
import { Footer, Header } from "src/components";

function MainLayoutInner({ children }: RegisterLayoutPropsType) {
	return (
		<div>
			<Header />
			<div className='flex justify-center bg-[rgba(0,0,0,.09)] lg:overflow-hidden'>
				{children} <Outlet />
			</div>
			<Footer />
		</div>
	);
}
const MainLayout = memo(MainLayoutInner);
export default MainLayout;
