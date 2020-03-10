import { combineReducers } from 'redux';
import { noteReducers } from './notes/noteReducers';

const rootReducer = combineReducers({
	noteReducers: noteReducers
});

export default rootReducer;
