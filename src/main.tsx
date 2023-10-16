import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "src/App";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "src/components";
// react helmet
import { HelmetProvider } from "react-helmet-async";
// i18n = change languages
import "src/i18n";
// RTK Query
import { Provider } from "react-redux";
import store from "src/store";

// Chú ý: HelmetProvider để sử dụng { Helmet } from "react-helmet-async", bọc App và ngay bên dưới React Router
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Router>
			<HelmetProvider>
				<Provider store={store}>
					<ErrorBoundary>
						<App />
					</ErrorBoundary>
				</Provider>
			</HelmetProvider>
		</Router>
	</React.StrictMode>,
);
