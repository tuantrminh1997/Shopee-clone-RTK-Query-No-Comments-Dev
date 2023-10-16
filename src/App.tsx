/* eslint-disable react-hooks/exhaustive-deps */
// react toastify:
import { ToastContainer } from "react-toastify";
// react hooks:
import { useEffect } from "react";
// react redux
import { useDispatch } from "react-redux";
// custome hooks:
import { useRouteElements } from "src/hooks";
// event target:
import { clearLocalStorageEventTarget, clearAccessTokenUserProfileEventMessage } from "src/utils";
import "react-toastify/dist/ReactToastify.css";
// actions:
import { setUserProfileAction, setIsLoggedInAction } from "src/slices/appSlice";
import { updateExtendPurchaseListAction } from "src/slices/purchaseListSlice";

function App() {
	const routeElements = useRouteElements();
	const dispatch = useDispatch();

	useEffect(() => {
		const resetIsLoggedInUserProfile = () => {
			dispatch(setUserProfileAction(null));
			dispatch(setIsLoggedInAction(false));
			dispatch(updateExtendPurchaseListAction([]));
		};
		clearLocalStorageEventTarget.addEventListener(clearAccessTokenUserProfileEventMessage, resetIsLoggedInUserProfile);
		// clean up function:
		return () => clearLocalStorageEventTarget.removeEventListener(clearAccessTokenUserProfileEventMessage, resetIsLoggedInUserProfile);
	}, []);

	return (
		<div>
			{routeElements}
			<ToastContainer />
		</div>
	);
}

export default App;
