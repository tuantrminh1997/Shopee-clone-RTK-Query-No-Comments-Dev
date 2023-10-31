import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "src/App";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "src/components";
import { HelmetProvider } from "react-helmet-async";
import "src/i18n";
import { Provider } from "react-redux";
import store from "src/store";

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
