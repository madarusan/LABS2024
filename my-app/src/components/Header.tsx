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
import { useNavigate } from "react-router-dom";
import { EventModal } from "./Event-Modal";
export type HeaderProps = {
	weekDates: string[];
	setWeekDates: (dates: string[]) => void;
};
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

	const handleClose = () => {
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
		<Box sx={{display:'flex', justifyContent:'space-between', gap:1,alignItems:'center'}}>
			<Box  sx={{m:1}}>
				<Button
					variant="outlined"
					className="arrow-btn"
					onClick={() => changeWeek("previous")}
					sx={{m:1}}
				>
					<ChevronLeft />
				</Button>
				<Button
					variant="outlined"
					className="arrow-btn"
					onClick={() => changeWeek("next")}
					sx={{m:1}}
				>
					<ChevronRight />
				</Button>
			</Box>
			<Box sx={{m:1}}>
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
					sx={{m:1}}
				>
					TODAY
				</Button>
				<Button
					variant="contained"
					className="new-event-btn"
					onClick={handleClickOpen}
					sx={{m:1}}
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
				<MenuItem onClick={handleCloseMenu} sx={{display:'flex',flexDirection:'column', alignItems:'flex-start'}}>
					<Typography  sx={{ fontWeight:'bold'}}>
						mIRC Student
					</Typography>
					<Typography variant='caption'>only_legends@yahoo.com</Typography>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleCloseMenu}>
					<Logout sx={{pr:1}}  />
					Sign Out
				</MenuItem>
			</Menu>
		</Box>
	);
};
