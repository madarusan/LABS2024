import React, { useState, useEffect } from "react";
import {
	TableContainer,
	Table,
	TableCell,
	TableHead,
	TableRow,
	TableBody,
	Typography,
} from "@mui/material";
import { Slot } from "./Slot";
import { mocks } from "../assets/mocks";
import { ICalendarEntry } from "../types";
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
export type ScheduleProps ={
	data : ICalendarEntry[];
	 weekDates : string[];
	 setWeekDates :  (dates: string[]) => void;
}
export const Schedule = ({data, weekDates, setWeekDates} : ScheduleProps) => {
	const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	const hoursDay = [8, 10, 12, 14, 16, 18, 20];
	// const [data, setData] = useState<ICalendarEntry[]>([]);
	// const [weekDates, setWeekDates] = useState<string[]>([]);
	// useEffect(() => {
	// 	const startOfWeek = dayjs().startOf('week');
	// 	const endOfWeek = dayjs().endOf('week');

	// 	const filteredData = mocks.filter(item => {
	// 		const itemDate = dayjs(item.timeStamp);
	// 		return itemDate.isSameOrAfter(startOfWeek) && itemDate.isSameOrBefore(endOfWeek);
	// 	});
	// 	setData(filteredData);

	// 	const datesOfWeek = Array.from({ length: 5 }, (_, i) =>
	// 		startOfWeek.add(i, "day").format("DD MMM")
	// 	);
	// 	setWeekDates(datesOfWeek);
	// }, []);
	return (
		<TableContainer>
			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
			>
				<TableHead>
					<TableRow>
						<TableCell size="medium"></TableCell>
						{weekDays.map((weekday, index) => (
							<TableCell
								key={weekday}
								size="medium"
							>
								{weekday}
								<Typography>{weekDates[index]}</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{hoursDay.map((hour) => (
						<TableRow key={hour}>
							<TableCell
								size="medium"
								component="th"
								scope="row"
							>
								{hour < 12 ? `${hour} AM` : `${hour} PM`}
							</TableCell>
							{weekDays.map((weekDay) => (
								<TableCell
									size="medium"
									key={weekDay}
								>
									{(() => {
										let slotAdded = false;
										const slots = data.map((item) => {
											const itemDate = dayjs(
												item.timeStamp
											);
											const itemHour = itemDate.hour();
											const itemDay =
												itemDate.format("dddd");
											if (
												itemDay === weekDay &&
												itemHour === hour
											) {
												slotAdded = true;
												return (
													<Slot
														key={item.id}
														details={{
															id: item.id,
															title: item.title,
															type: item.type,
															timeStamp:
																item.timeStamp,
															location:
																item.location,
														}}
													/>
												);
											}
										});
										if (!slotAdded) {
											slots.push(<Slot />);
										}
										return slots;
									})()}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};


