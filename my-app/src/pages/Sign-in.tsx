import React from "react";
import { Button } from "@mui/material";
import logo from "../assets/logo.svg";
import "./Sign-in.scss";
import { useNavigate } from "react-router-dom";
export type SignInProps = {
	signIn: () => void;
};
export const SignInPage = ({ signIn }: SignInProps) => {
	const navigate = useNavigate();

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
					// navigate("/home");
					signIn();
				}}
			>
				LOGIN
			</Button>
		</div>
	);
};
