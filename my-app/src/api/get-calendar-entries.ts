import React from "react";
import { IPublicClientApplication } from "@azure/msal-browser";
import {URL_API}  from "../constants";
import { ICalendarEntry } from "../types";
import { useQuery } from "@tanstack/react-query";
import { prepareToken } from "./authUtils";


export async function getEntries(instance: IPublicClientApplication,fromDate: string, toDate: string) {
	const url = `${URL_API}?fromDate=${fromDate}&toDate=${toDate}`;
	const token = await prepareToken(instance);
	const response = await fetch(url, {
		method: "GET", 
		headers: {
			Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
	}});
	return (await response.json()) as ICalendarEntry[];
}

export function useCalendarQuery(
	instance: IPublicClientApplication,
	fromDate: string,
	toDate: string
) {
	return useQuery({
		queryKey: [fromDate, toDate],
		queryFn: async() => {
			const responseData =  await(getEntries(instance,fromDate, toDate));
			return responseData;
		},
		enabled: (fromDate!=='' && toDate!==''),
	
	});
}