// react router dom:
import { useLocation } from "react-router-dom";
// react redux
import { useSelector } from "react-redux";
// react hooks:
import { useMemo, memo } from "react";
// utils:
import { isUserAccountPath } from "src/utils";
// types
import { RootState } from "src/types";
// private components:
import { AvatarName, MyAccount, PurchaseList } from "./components";

function UserProfileLayoutSideNavbarInner() {
	const userProfile = useSelector((state: RootState) => state.app.userProfile);
	const currentUrlPathName = useLocation().pathname;
	const isOpenMyAccountNavbar = useMemo(() => isUserAccountPath(currentUrlPathName), [currentUrlPathName]);

	return (
		<div className='max-w-[180px] min-w-[168px] flex flex-col border xl:mx-3'>
			<AvatarName userProfile={userProfile} />
			<div className='pt-7'>
				<MyAccount isOpenMyAccountNavbar={isOpenMyAccountNavbar} />
				<PurchaseList />
			</div>
		</div>
	);
}
const UserProfileLayoutSideNavbar = memo(UserProfileLayoutSideNavbarInner);
export default UserProfileLayoutSideNavbar;
