// recat router dom:
import { Outlet } from "react-router-dom";
// react hooks:
import { memo } from "react";
// Sử dụng {Helmet} từ react helmet async thay vì { Helmet } từ react-helmet -> handle vấn đề báo lỗi ở console Using UNSAFE_componentWillMount ...v...v.....
import { Helmet } from "react-helmet-async";
// private components:
import UserProfileLayoutSideNavbar from "./UserProfileLayoutSideNavbar";

function UserProfileLayoutInner() {
	console.log("UserProfileLayout re-render");
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
