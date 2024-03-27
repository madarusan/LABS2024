import React, { useState } from "react";
import { ICalendarEntry } from "../types";
import { EmptySlotButton } from "./EmptySlotButton";
import { PopulatedSlotButton } from "./PopulatedSlotButton";
export type SlotProps = {
	details?: ICalendarEntry;
};
export const Slot = ({ details }: SlotProps) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return !details ? (
		<EmptySlotButton
			handleClickOpen={handleClickOpen}
			isModalOpen={open}
			onClose={handleClose}
		/>
	) : (
		<PopulatedSlotButton
			details={details}
			handleClickOpen={handleClickOpen}
			isModalOpen={open}
			onClose={handleClose}
		/>
	);
};
