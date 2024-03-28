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
import { ICalendarEntry } from "../types";
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
export type ScheduleProps ={
	data : ICalendarEntry[] | undefined;
	 weekDates : string[];
}
export const Schedule = ({data, weekDates} : ScheduleProps) => {
	const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	const hoursDay = [8, 10, 12, 14, 16, 18, 20];
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
									{data?.map((item) => {
										console.log(data);
										const itemDate = dayjs(item.timeStamp);
										const itemHour = itemDate
											.add(2, "hour")
											.hour();
										const itemDay = itemDate
											.add(2, "hour")
											.format("dddd");
//TO DO : check why the populated slot is not showing up
										if (
											itemDay === weekDay &&
											itemHour === hour
										) {
											console.log(item);
											return (
												<Slot
													key={item.id}
													details={{
														id: item.id,
														title: item.title,
														type: item.type,
														timeStamp:
															item.timeStamp,
														location: item.location,
													}}
												/>
											);
										}

										return <Slot />;
									})}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};


