import React from "react";
import { Button } from "@mui/material";
import logo from "../assets/logo.svg";
import "./Sign-in.scss";
import { useNavigate } from "react-router-dom";
export const SignInPage = () => {
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
					navigate("/home");
				}}
			>
				LOGIN
			</Button>
		</div>
	);
};
