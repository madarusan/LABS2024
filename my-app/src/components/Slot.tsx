import React, { useState } from "react";
import {
	Card,
	IconButton,
	Typography,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { Add, MoreVert, Edit, Delete } from "@mui/icons-material";
import { ICalendarEntry } from "../types";
import { EventModal } from "./Event-Modal";
export type SlotProps = {
	details?: ICalendarEntry;
};
export const Slot = ({ details }: SlotProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);
	const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(null);
		if (event.currentTarget.textContent === "Edit") {
			console.log("edit event");
		} else if (event.currentTarget.textContent === "Delete") {
			console.log("delete event");
		}
	};
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
	};
	const handleType = (type: number | string) => {
		if (type === 0) return "Curs";
		else if (type === 1) return "Laborator";
		else return "Seminar";
	};
	return !details ? (
		<Card
			sx={{
				boxShadow: "0px 0px 0px 0px white",
				border: "1px dashed #006262",
				background: "#0062620A",
				display: "flex",
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
				open={open}
				onClose={handleClose}
			/>
		</Card>
	) : (
		<Card
			sx={{
				display: "flex",
				justifyContent: "space-around",
				background: "#006262",
				color: "#fff",
				width: "10rem",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<Typography>
					{handleType(details.type) + " " + details.title}
				</Typography>
				<Typography>{details.location}</Typography>
			</div>
			<IconButton
				aria-label="settings"
				sx={{
					color: "#fff",
					"&:hover": {
						background: "none",
						color: "#cecece",
					},
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
		</Card>
	);
};
