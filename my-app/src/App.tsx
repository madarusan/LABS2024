import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { SignInPage } from "./pages/SignIn";
import { Main } from "./pages/Main";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./api/authConfig";

const App = () => {
	const { instance } = useMsal();
	const isAuthenticated = useIsAuthenticated();

	const signIn = async () => {
		try {
			// Login logic using MSAL
			const loginResponse = await instance.loginPopup(loginRequest);
			sessionStorage.setItem(
				"user",
				JSON.stringify(loginResponse.account)
			);
		} catch (error) {
			console.error("Login failed: ", error);
		}
	};

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						isAuthenticated ? (
							<Navigate to="/home" />
						) : (
							<SignInPage signIn={signIn} />
						)
					}
				/>
				<Route
					path="/home"
					element={
						isAuthenticated ? (
							<Main instance={instance} />
						) : (
							<Navigate to="/" />
						)
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
