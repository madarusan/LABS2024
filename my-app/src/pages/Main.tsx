import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Header } from "../components/Header";
import { Schedule } from "../components/Schedule";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useCalendarQuery } from "../api/get-calendar-entries";
import { IPublicClientApplication } from "@azure/msal-browser";

dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(advancedFormat);

export type MainProps = {
	instance: IPublicClientApplication;
};

export const Main = ({ instance }: MainProps) => {
	const [weekDates, setWeekDates] = useState<string[]>([]);
	const [fromDate, setFromDate] = useState<string>("");
	const [toDate, setToDate] = useState<string>("");

	const { data: calendarEntries } = useCalendarQuery(
		instance,
		fromDate,
		toDate
	);
	console.log(calendarEntries, fromDate, toDate);

	const changeWeek = (direction: string) => {
		let newWeekDates: string[] = [];

		if (direction === "previous") {
			newWeekDates = weekDates.map((date) =>
				dayjs(date, "Do MMMM").subtract(7, "day").format("Do MMMM")
			);
		} else if (direction === "next") {
			newWeekDates = weekDates.map((date) =>
				dayjs(date, "Do MMMM").add(7, "day").format("Do MMMM")
			);
		} else if (direction === "today") {
			const startOfWeek = dayjs().startOf("week").add(1, "day");
			newWeekDates = Array.from({ length: 5 }, (_, i) =>
				startOfWeek.add(i, "day").format("Do MMMM")
			);
		}
		const startOfWeek = dayjs(newWeekDates[1], "Do MMMM")
			.startOf("day")
			.toISOString();
		const endOfWeek = dayjs(newWeekDates[4], "Do MMMM")
			.endOf("day")
			.toISOString();
		setFromDate(startOfWeek);
		setToDate(endOfWeek);

		setWeekDates(newWeekDates);
	};
	useEffect(() => {
		const startOfWeek = dayjs().startOf("week").add(1, "day");
		const datesOfWeek = Array.from({ length: 5 }, (_, i) =>
			startOfWeek.add(i, "day").format("Do MMMM")
		);
		setWeekDates(datesOfWeek);
		const startOfWeekISO = startOfWeek.toISOString();
		const endOfWeekISO = startOfWeek
			.add(4, "day")
			.endOf("day")
			.toISOString();
		setFromDate(startOfWeekISO);
		setToDate(endOfWeekISO);
	}, []);

	return (
		<Container>
			<Header changeWeekDates={changeWeek} />
			<Schedule
				data={calendarEntries}
				weekDates={weekDates}
			/>
		</Container>
	);
};
