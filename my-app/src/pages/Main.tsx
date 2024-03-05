import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Header } from "../components/Header";
import { Schedule } from "../components/Schedule";
import { mocks } from "../assets/mocks";
import { ICalendarEntry } from "../types";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(advancedFormat);
// 
export const Main = () => {
	const [data, setData] = useState<ICalendarEntry[]>([]);
	const [weekDates, setWeekDates] = useState<string[]>([]);

	useEffect(() => {
		if (weekDates.length === 0) {
			const startOfWeek = dayjs().startOf("week").add(1, "day");

			const datesOfWeek = Array.from({ length: 5 }, (_, i) =>
				startOfWeek.add(i, "day").format("Do MMMM")
			);
			setWeekDates(datesOfWeek);
		}
	}, [weekDates]);

	useEffect(() => {
		const filteredData = mocks.filter((item) => {
			const itemDate = dayjs(item.timeStamp).format("Do MMMM");
			return weekDates.includes(itemDate);
		});
		setData(filteredData);
	}, [weekDates]);

	return (
		<Container>
			<Header
				weekDates={weekDates}
				setWeekDates={setWeekDates}
			/>
			<Schedule
				data={data}
				weekDates={weekDates}
				setWeekDates={setWeekDates}
			/>
		</Container>
	);
};
