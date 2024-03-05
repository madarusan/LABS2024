import React , {useState} from "react";
import "./Header.scss";
import dayjs from "dayjs";
import {
	TextField,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Divider,
	Typography,
} from "@mui/material";
import {
	Settings,
	ChevronLeft,
	ChevronRight,
	Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EventModal } from "./Event-Modal";
export type HeaderProps = {
	weekDates: string[];
	setWeekDates: (dates: string[]) => void;
};
// 
export const Header = ({ weekDates, setWeekDates }: HeaderProps) => {
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

	const changeWeek = (direction: string) => {
		let newWeekDates = weekDates;
		if (direction === "previous") {
			newWeekDates = newWeekDates.map((date) => {
				return dayjs(date, "Do MMMM")
					.subtract(7, "day")
					.format("Do MMMM");
			});
		} else if (direction === "next") {
			newWeekDates = newWeekDates.map((date) => {
				return dayjs(date, "Do MMMM").add(7, "day").format("Do MMMM");
			});
		} else if (direction === "today") {
			const today = dayjs();
			const startOfWeek = today.startOf('week').add(1, 'day'); // Start from Monday
			newWeekDates = Array.from({ length: 5 }, (_, i) => // Only Monday to Friday
				startOfWeek.add(i, 'day').format("Do MMMM")
			);
		}
		setWeekDates(newWeekDates);
	};

	return (
		<div className="header">
			<div className="left-group">
				<Button
					variant="outlined"
					className="arrow-btn"
					onClick={() => changeWeek("previous")}
				>
					<ChevronLeft />
				</Button>
				<Button
					variant="outlined"
					className="arrow-btn"
					onClick={() => changeWeek("next")}
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
					disabled
				/>
				<Button
					variant="outlined"
					className="today-btn"
					onClick={() => changeWeek("today")}
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
