import React, { useEffect, useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	Select,
	SelectChangeEvent,
	TextField,
	MenuItem,
	Box,
} from "@mui/material";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ICalendarEntry } from "../types";
export type EventModalProps = {
	open: boolean;
	onClose: (e?: any) => void;
	eventDetails?: ICalendarEntry;
};

enum ActivityType { CURS = 'Curs', LABORATOR = 'Laborator', SEMINAR = 'Seminar'	}

export const EventModal = ({
	open,
	onClose,
	eventDetails,
}: EventModalProps) => {

	const date = new Date();
	const [activityType, setActivityType] = useState('');
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [selectedDate, setSelectedDate] = useState(date.toISOString());
	const handleClose = (e: any) => {
		onClose(e);
	};
	const handleTypeChange = (event: SelectChangeEvent) => {
		setActivityType(event.target.value);
	};

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleLocationChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setLocation(event.target.value);
	};

	const handleDateChange = (date: dayjs.Dayjs | null) => {
		if (date) {
			const utcDate = dayjs(date);
			setSelectedDate(utcDate.toISOString());
		}
	};
	const handleSubmit = () => {
		console.log({
			title: title,
			activityType: activityType,
			location: location,
			date: selectedDate,
		});
	};
	useEffect(() => {
		if (eventDetails) {
			setActivityType(eventDetails.type);
			setTitle(eventDetails.title);
			setLocation(eventDetails.location);
			setSelectedDate(eventDetails.timeStamp);
		}
	}, [eventDetails]);
	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<DialogTitle>Create New Event</DialogTitle>
			<DialogContent
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					columnGap: "1rem",
				}}
			>
				<Box display={'flex'} flexDirection={'column'} gap={2} >
					<TextField
						required
						id="title"
						name="title"
						label="Title"
						variant="standard"
						value={title}
						onChange={handleTitleChange}
						fullWidth
					
					/>
					<FormControl
						variant="standard"
						required
						fullWidth
					>
						<InputLabel id="type-label"
						>
							Type
						</InputLabel>
						<Select
							value={activityType}
							label="Type"
							onChange={handleTypeChange}
							labelId="type-label"
							
						>
							{Object.values(ActivityType).map((activity,index) => (<MenuItem value={index}>{activity}</MenuItem>))}						
						</Select>
					</FormControl>
					<TextField
						required
						id="location"
						name="location"
						label="Location"
						variant="standard"
						value={location}
						onChange={handleLocationChange}
						fullWidth
					/>
				</Box>
				<StaticDateTimePicker
					ampmInClock={true}
					views={["day", "hours"]}
					slotProps={{
						toolbar: {
							hidden: true,
						},
						actionBar: () => ({
							actions: [],
						}),
					}}
sx={{
						minHeight: "25rem",
						".MuiTimeClock-root": {
							marginTop: "2rem",
						},
						".MuiDateCalendar-root": {
							marginTop: "2rem",
						},
					}}
					defaultValue={dayjs()}
					onChange={handleDateChange}
					value={dayjs(selectedDate)}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					sx={{ color: "#000" }}
					variant="text"
				>
					Cancel
				</Button>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					onClick={handleSubmit}
				>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};
