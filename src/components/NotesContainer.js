import React, { useState } from 'react';
import { connect } from 'react-redux';
import OutsideAlerter from './OutsideAlerter';
import { addNote, deleteNote, editNote } from '../redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../App.scss';

function NotesContainer(props) {
	const [ text, setText ] = useState('');
	const [ id, setId ] = useState('');

	const dateFormat = (dated) => {
		let tempDate = new Date();
		let date =
			dated +
			' ' +
			tempDate.getHours() +
			':' +
			('0' + tempDate.getMinutes()).slice(-2) +
			':' +
			('0' + tempDate.getSeconds()).slice(-2) +
			' ' +
			('0' + tempDate.getDate()).slice(-2) +
			'-' +
			('0' + (tempDate.getMonth() + 1)).slice(-2) +
			'-' +
			tempDate.getFullYear();
		return date;
	};

	const handleAdd = () => {
		if (text !== '') {
			props.addNote(text, dateFormat('ADDED:'));
			setText('');
		}
	};

	const textClick = (e) => {
		e.target.style.display = 'none';
		setId(parseInt(e.target.id));
	};

	const handleEdit = (dataText, dataId) => {
		if (dataText === '') {
			props.deleteNote(dataId);
		} else {
			props.editNote(dataText, dataId, dateFormat('EDITED:'));
		}
		setId('');
	};

	return (
		<div id="bigNotesContainer">
			<form>
				<header>
					<p id="react-color">react</p>
					<p id="dash"> - </p>
					<p id="redux-color">redux</p>
					<p id="mark-header">markdown notes</p>
				</header>
				<p>click on text to edit</p>
				<textarea
					autoFocus
					placeholder="start typing..."
					onChange={(e) => setText(e.target.value)}
					value={text}
				/>
				<button type="reset" onClick={handleAdd}>
					add note
				</button>
			</form>
			<div id="notesContainer">
				{props.noteText.map((x) => {
					return (
						<div className="todoItem" key={x.id}>
							<div className="noteTextCont">
								<div className="data">
									{x.date}
									<FontAwesomeIcon
										color="#fce77d"
										id="trash"
										onClick={() => props.deleteNote(x.id)}
										icon={faTrashAlt}
									/>
								</div>

								<pre id={`${x.id}beforeArea`} className="noteBefore" onClick={textClick}>
									{x.text}
								</pre>
								{x.id === id ? (
									<OutsideAlerter passId={x.id} passText={x.text} sendData={handleEdit} />
								) : (
									''
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		noteText: state.noteReducers
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addNote: (text, date) => dispatch(addNote(text, date)),
		deleteNote: (id) => dispatch(deleteNote(id)),
		editNote: (text, id, date) => dispatch(editNote(text, id, date))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
