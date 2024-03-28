import React from "react";
import { Button } from "@mui/material";
import logo from "../assets/logo.svg";
import "./SignIn.styles.scss";
export type SignInProps = {
	signIn: () => void;
};
export const SignInPage = ({ signIn }: SignInProps) => {
	return (
		<div className="landing-logo">
			<img
				src={logo}
				alt="Access Logo"
			/>
			<Button
				variant="contained"
				className="login-btn"
				onClick={() => {
					signIn();
				}}
			>
				LOGIN
			</Button>
		</div>
	);
};
