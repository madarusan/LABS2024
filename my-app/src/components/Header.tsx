import React , {useState} from "react";
import "./Header.scss";
import { TextField, Button, IconButton, Menu, MenuItem, Divider, Typography } from "@mui/material";
import { Settings, ChevronLeft, ChevronRight, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EventModal } from "./Event-Modal";
export const Header = () => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);
	const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(null);
		if (event.currentTarget.textContent === "Sign Out") {
			navigate("/");
		}
	};
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value: string) => {
		setOpen(false);
	};
	return (
		<div className="header">
			<div className="left-group">
				<Button
					variant="outlined"
					className="arrow-btn"
				>
					<ChevronLeft />
				</Button>
				<Button
					variant="outlined"
					className="arrow-btn"
				>
					<ChevronRight />
				</Button>
			</div>
			<div className="right-group">
				<span></span>
				<TextField
					label="Search"
					variant="standard"
					className="search-field"
				/>
				<Button
					variant="outlined"
					className="today-btn"
				>
					TODAY
				</Button>
				<Button
					variant="contained"
					className="new-event-btn"
					onClick={handleClickOpen}
				>
					New Event
				</Button>
				<EventModal
					open={open}
					onClose={handleClose}
				/>
				<IconButton onClick={handleClickMenu}>
					<Settings />
				</IconButton>
			</div>
			<Menu
				className="menu-list"
				anchorEl={anchorEl}
				id="account-menu"
				open={openMenu}
				onClose={handleCloseMenu}
				onClick={handleCloseMenu}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem onClick={handleCloseMenu}>
					<Typography className="student-name">
						mIRC Student
					</Typography>
					<Typography>only_legends@yahoo.com</Typography>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleCloseMenu}>
					<Logout className="log-out-icon" />
					Sign Out
				</MenuItem>
			</Menu>
		</div>
	);
};
