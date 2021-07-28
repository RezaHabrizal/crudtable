import React from "react"

export const GlobalFilter = ({ filter, setFilter }) => {
	return (
		<span>
			Search:{" "}
			<input
				type="text"
				placeholder="keyword here..."
				className="focus:outline-none focus:ring focus:border-blue-300 ml-1"
				value={filter || ""}
				onChange={(e) => setFilter(e.target.value)}
			/>
		</span>
	)
}
