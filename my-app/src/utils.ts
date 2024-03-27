import React from 'react';

export const getUser =()=> {
	const storedUserString  = sessionStorage.getItem("user");
	const storedUser = storedUserString!==null ? JSON.parse(storedUserString) : {};
	const name = storedUser.name;
	const username = storedUser.username;
	return {
		name: name,
		userEmail: username,
	}
}