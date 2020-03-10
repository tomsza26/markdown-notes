import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from './noteTypes';

export const noteReducers = (state = [], action) => {
	switch (action.type) {
		case ADD_NOTE:
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					date: action.date
				}
			];

		case DELETE_NOTE:
			return state.filter(({ id }) => id !== action.id);

		case EDIT_NOTE:
			return state.map((x) => {
				if (x.id === action.id) {
					return {
						id: action.id,
						text: action.text,
						date: action.date
					};
				}
				return x;
			});

		default:
			return state;
	}
};
