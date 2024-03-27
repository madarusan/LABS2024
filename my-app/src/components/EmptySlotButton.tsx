import React from "react";
import { Add } from "@mui/icons-material";
import { IconButton, Card } from "@mui/material";
import { EventModal } from "./EventModal";
export type EmptySlotButtonProps = {
	handleClickOpen: () => void;
	isModalOpen: boolean;
	onClose: () => void;
};
export const EmptySlotButton = ({
	handleClickOpen,
	isModalOpen,
	onClose,
}: EmptySlotButtonProps) => {
	return (
		<Card
			elevation={1}
			sx={{
				border: "1px dashed #006262",
				background: "#0062620A",

				justifyContent: "center",
				width: "10rem",
			}}
		>
			<IconButton
				sx={{
					"&:hover": {
						background: "none",
						color: "#006262",
					},
				}}
				onClick={handleClickOpen}
			>
				<Add />
			</IconButton>
			<EventModal
				open={isModalOpen}
				onClose={onClose}
			/>
		</Card>
	);
};
