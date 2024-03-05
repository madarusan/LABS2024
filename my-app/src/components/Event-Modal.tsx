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
} from "@mui/material";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ICalendarEntry } from "../types";
export type EventModalProps = {
	open: boolean;
	onClose: (e?: any) => void;
	eventDetails?: ICalendarEntry;
};

export const EventModal = ({
	open,
	onClose,
	eventDetails,
}: EventModalProps) => {
	dayjs.extend(utc);
	const [activityType, setActivityType] = useState("-1");
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");
	const [selectedDate, setSelectedDate] = useState(dayjs().toISOString());
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
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						rowGap: "1rem",
					}}
				>
					<TextField
						required
						id="title"
						name="title"
						label="Title"
						variant="standard"
						value={title}
						onChange={handleTitleChange}
						sx={{
							"label.Mui-focused": {
								color: "#000",
							},
							".MuiInput-root::after": {
								borderBottom: "2px solid #000",
							},
						}}
					/>
					<FormControl
						variant="standard"
						required
					>
						<InputLabel
							sx={{
								"&.Mui-focused": {
									color: "#000",
								},
								// "&::after": {   // not working to change the border-bottom from standard blue to black
								// 	borderBottom: "2px solid #000",
								// },
							}}
						>
							Type
						</InputLabel>
						<Select
							value={activityType}
							label="Type"
							onChange={handleTypeChange}
						>
							<MenuItem value={"-1"}>
								<em>None</em>
							</MenuItem>
							<MenuItem value={"0"}>Curs</MenuItem>
							<MenuItem value={"1"}>Laborator</MenuItem>
							<MenuItem value={"2"}>Seminar</MenuItem>
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
						sx={{
							"label.Mui-focused": {
								color: "#000",
							},
							".MuiInput-root::after": {
								borderBottom: "2px solid #000",
							},
						}}
					/>
				</div>
				<StaticDateTimePicker
					ampmInClock={true}
					views={["day", "hours"]}
					slotProps={{
						toolbar: {
							hidden: true,
						},
						actionBar: ({ wrapperVariant }) => ({
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
				>
					Cancel
				</Button>
				<Button
					type="submit"
					variant="contained"
					sx={{
						background: "#E5173F",
						"&:hover": {
							background: "darkred",
						},
					}}
					onClick={handleSubmit}
				>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};
