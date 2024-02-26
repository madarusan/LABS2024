import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignInPage } from "./pages/Sign-in";
import { Main } from "./pages/Main";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={<SignInPage />}
				/>
				<Route
					path="/home"
					element ={<Main />}
				/>
			</Routes>
		</div>
	);
}

export default App;
