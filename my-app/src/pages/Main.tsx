import React from "react";
// import "./Main.scss";
import { Container } from "@mui/material";
import { Header } from "../components/Header";
import { Schedule } from "../components/Schedule";

export const Main = () => {
	return (
		<Container
			// sx={{
			// 	display: "flex",
			// 	alignItems: "center",
			// 	justifyContent: "center",
			// }}
		>
			<Header />
			<Schedule />
		</Container>
	);
};
