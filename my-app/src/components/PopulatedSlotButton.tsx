import React from "react";
import {
	Card,
	Box,
	Typography,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { ICalendarEntry } from "../types";
import { MoreVert, Edit, Delete } from "@mui/icons-material";
import { EventModal } from "./EventModal";

export type PopulatedSlotButtonProps = {
	details: ICalendarEntry;
	handleClickOpen: () => void;
	isModalOpen: boolean;
	onClose: () => void;
};

export const PopulatedSlotButton = ({
	details,
	handleClickOpen,
	isModalOpen,
	onClose,
}: PopulatedSlotButtonProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);
	const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {
		if (event.currentTarget.textContent === "Edit") {
			console.log("edit event");
			handleClickOpen();
		} else if (event.currentTarget.textContent === "Delete") {
			console.log("delete event");
		}
		setAnchorEl(null);
	};
	const handleType = (type: number | string) => {
		if (type === "0") return "Curs";
		else if (type === "1") return "Laborator";
		else return "Seminar";
	};
	return (
		<Card
			sx={{
				display: "flex",
				justifyContent: "space-around",
				background: "#006262",
				color: "#fff",
				maxWidth: "10rem",
			}}
		>
			<Box sx={{ p: 1 }}>
				<Typography variant="body2">
					{handleType(details.type)}
				</Typography>
				<Divider />
				<Typography variant="caption">{details.title}</Typography>
				<Typography variant="caption">{details.location}</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<IconButton
					aria-label="settings"
					sx={{
						color: "#fff",
					}}
					onClick={handleClickMenu}
				>
					<MoreVert />
				</IconButton>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={openMenu}
					onClose={handleCloseMenu}
					onClick={handleCloseMenu}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				>
					<MenuItem onClick={handleCloseMenu}>
						<ListItemIcon>
							<Edit fontSize="small" />
						</ListItemIcon>
						<ListItemText>Edit</ListItemText>
					</MenuItem>
					<MenuItem onClick={handleCloseMenu}>
						<ListItemIcon>
							<Delete fontSize="small" />
						</ListItemIcon>
						<ListItemText>Delete</ListItemText>
					</MenuItem>
				</Menu>
				<EventModal
					open={isModalOpen}
					onClose={onClose}
					eventDetails={details}
				/>
			</Box>
		</Card>
	);
};
