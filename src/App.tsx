/* eslint-disable react-hooks/exhaustive-deps */
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteElements } from "src/hooks";
import { clearLocalStorageEventTarget, clearAccessTokenUserProfileEventMessage } from "src/utils";
import "react-toastify/dist/ReactToastify.css";
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
