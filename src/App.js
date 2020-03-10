import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import NotesContainer from './components/NotesContainer';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<NotesContainer />
			</div>
		</Provider>
	);
}

export default App;
