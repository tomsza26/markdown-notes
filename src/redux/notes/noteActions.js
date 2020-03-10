import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from './noteTypes';

let addId = 0;

export const addNote = (text, date) => ({
	type: ADD_NOTE,
	id: addId++,
	date: date,
	text
});

export const deleteNote = (id) => {
	return {
		type: DELETE_NOTE,
		id: id
	};
};

export const editNote = (text, id, date) => {
	return {
		type: EDIT_NOTE,
		id: id,
		date: date,
		text
	};
};
