import React, { useRef, useEffect, useState } from 'react';

function useOutsideAlerter(ref, props, edit) {
	function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target)) {
			document.getElementById(`textArea${props.passId}`).style.display = 'none';
			document.getElementById(`${props.passId}beforeArea`).style.display = 'block';
			props.sendData(edit, props.passId);
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
}

function OutsideAlerter(props) {
	const wrapperRef = useRef(null);
	const [ edit, setEdit ] = useState(props.passText);
	useOutsideAlerter(wrapperRef, props, edit);

	return (
		<textarea
			id={`textArea${props.passId}`}
			className="noteTextArea"
			defaultValue={props.passText}
			ref={wrapperRef}
			onChange={(e) => setEdit(e.target.value)}
		/>
	);
}

export default OutsideAlerter;
