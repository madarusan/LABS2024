import React , {useState} from "react";
import dayjs from "dayjs";
import {
	TextField,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Divider,
	Typography,
	Box,
} from "@mui/material";
import {
	Settings,
	ChevronLeft,
	ChevronRight,
	Logout,
} from "@mui/icons-material";
import { EventModal } from "./EventModal";
import { getUser } from "../utils";
import { useMsal } from "@azure/msal-react";
export type HeaderProps = {
	changeWeekDates: (dates: string) => void;
};
export const Header = ({ changeWeekDates }: HeaderProps) => {
	const { instance } = useMsal();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);
	const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(null);
		if (event.currentTarget.textContent === "Sign Out") {
			instance.logoutPopup({
				postLogoutRedirectUri: "/",
				mainWindowRedirectUri: "/",
			});
			sessionStorage.clear()
		}
	};
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				gap: 1,
				alignItems: "center",
			}}
		>
			<Box sx={{ m: 1 }}>
				<Button
					variant="outlined"
					className="arrow-btn"
					onClick={() => changeWeekDates("previous")}
					sx={{ m: 1 }}
				>
					<ChevronLeft />
				</Button>
				<Button
					variant="outlined"
					className="arrow-btn"
					onClick={() => changeWeekDates("next")}
					sx={{ m: 1 }}
				>
					<ChevronRight />
				</Button>
			</Box>
			<Box sx={{ m: 1 }}>
				<TextField
					label="Search"
					variant="standard"
					className="search-field"
					disabled
				/>
				<Button
					variant="outlined"
					className="today-btn"
					onClick={() => changeWeekDates("today")}
					sx={{ m: 1 }}
				>
					TODAY
				</Button>
				<Button
					variant="contained"
					className="new-event-btn"
					onClick={handleClickOpen}
					sx={{ m: 1 }}
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
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={openMenu}
				onClose={handleCloseMenu}
				onClick={handleCloseMenu}
			>
				<MenuItem
					onClick={handleCloseMenu}
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					<Typography sx={{ fontWeight: "bold" }}>
						{getUser().name}
					</Typography>
					<Typography variant="caption">
						{getUser().userEmail}
					</Typography>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleCloseMenu}>
					<Logout sx={{ pr: 1 }} />
					Sign Out
				</MenuItem>
			</Menu>
		</Box>
	);
};
