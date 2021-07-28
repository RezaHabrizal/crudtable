import "./App.css"
import React, { useEffect } from "react"
import TableProduct from "./components/TableProduct"
import AddProductModal from "./components/Modal"

function App() {
	return (
		<>
			<AddProductModal />
			<TableProduct />
		</>
	)
}

export default App
