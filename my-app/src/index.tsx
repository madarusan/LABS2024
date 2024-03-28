import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { msalConfig } from "./api/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const msalInstance = new PublicClientApplication(msalConfig);
export const queryClient = new QueryClient();
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<MsalProvider instance={msalInstance}>
				<Router>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<App />
					</LocalizationProvider>
				</Router>
			</MsalProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
