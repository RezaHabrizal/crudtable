import React, { useState, useEffect } from "react"

export const EditableCell = ({
	value: initialValue,
	row: { index },
	column: { id },
	updateMyData
}) => {
	const [value, setValue] = useState(initialValue)

	const onChange = (e) => {
		setValue(e.target.value)
	}

	const onBlur = () => {
		updateMyData(index, id, value)
	}

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	return <input value={value} onChange={onChange} onBlur={onBlur} />
}
