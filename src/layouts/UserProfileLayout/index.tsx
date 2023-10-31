import { Outlet } from "react-router-dom";
import { memo } from "react";
import { Helmet } from "react-helmet-async";
import UserProfileLayoutSideNavbar from "./UserProfileLayoutSideNavbar";

function UserProfileLayoutInner() {
	return (
		<div className='flex w-[1200px] pt-5 pb-14 xl:flex-col xl:w-screen'>
			<Helmet>
				<title>Quản lý tài khoản | Shopee clone</title>
				<meta name='description' content='Chức năng quản lý tài khoản - Dự án Shopee clone' />
			</Helmet>
			<UserProfileLayoutSideNavbar />
			<div className='ml-[27px] xl:mx-3'>
				<Outlet />
			</div>
		</div>
	);
}
const UserProfileLayout = memo(UserProfileLayoutInner);
export default UserProfileLayout;
