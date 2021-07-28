import React, { useEffect, useMemo, useState } from "react"
import { useTable, usePagination, useGlobalFilter } from "react-table"
import { useSelector, useDispatch } from "react-redux"
import { deleteProduct } from "../store/actions"
import { EditableCell } from "./EditAbleCell"
import { GlobalFilter } from "./GlobalFilter"

export default function PaginationTable() {
	const dataProducts = useSelector((state) => state.products)
	const dispatch = useDispatch()
	const [data, setData] = useState(() => dataProducts)
	const [skipPageReset, setSkipPageReset] = useState(false)

	useEffect(() => {
		setData(dataProducts)
	}, [dataProducts])

	useEffect(() => {
		setSkipPageReset(true)
	}, [data])

	const updateMyData = (rowIndex, columnId, value) => {
		setSkipPageReset(true)
		setData((old) =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex],
						[columnId]: value
					}
				}
				return row
			})
		)
	}

	const defaultColumn = {
		Cell: EditableCell
	}

	const COLUMNS = [
		{
			Header: "Foto Barang",
			accessor: "fotoBarang",
			Cell: (tableProps) => (
				<div>
					<img className="h-20" src={tableProps.row.original.fotoBarang} />
				</div>
			)
		},
		{
			Header: "Nama Barang",
			accessor: "namaBarang"
		},
		{
			Header: "Harga Beli",
			accessor: "hargaBeli"
		},
		{
			Header: "Harga Jual",
			accessor: "hargaJual"
		},
		{
			Header: "Stok",
			accessor: "stok"
		},
		{
			Header: "Actions",
			Cell: (tableProps) => {
				const edit = {
					namaBarang: tableProps.row.original.namaBarang,
					fotoBarang: tableProps.row.original.fotoBarang,
					hargaBeli: tableProps.row.original.hargaBeli,
					hargaJual: tableProps.row.original.hargaJual,
					stok: tableProps.row.original.stok
				}
				return (
					<div>
						<button
							className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() =>
								dispatch(deleteProduct(tableProps.row.original.namaBarang))
							}
						>
							DELETE
						</button>
					</div>
				)
			}
		}
	]

	const columns = useMemo(() => COLUMNS, [dataProducts])

	const tableInstance = useTable(
		{
			columns,
			defaultColumn,
			data,
			autoResetPage: !skipPageReset,
			updateMyData
		},
		useGlobalFilter,
		usePagination
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setPageSize,
		prepareRow,
		state,
		setGlobalFilter
	} = tableInstance

	const { globalFilter } = state

	useEffect(() => {
		setPageSize(3)
	}, [])

	return (
		<>
			<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal" {...getTableProps()}>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column) => (
										<th
											className="dark:bg-gray-800 dark:text-white px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
											{...column.getHeaderProps()}
										>
											{column.render("Header")}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{page.map((row) => {
								prepareRow(row)
								return (
									<tr {...row.getRowProps()}>
										{row.cells.map((cell) => {
											return (
												<td
													className="dark:bg-gray-800 dark:text-white px-5 py-5 border-b border-gray-200 bg-white text-sm"
													{...cell.getCellProps()}
												>
													{cell.render("Cell")}
												</td>
											)
										})}
									</tr>
								)
							})}
							<tr>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
				<div className="inline-flex mt-2 xs:mt-0">
					<button
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
						className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l mr-2 dark:bg-gray-800 dark:text-white"
					>
						Prev
					</button>
					<button
						onClick={() => nextPage()}
						disabled={!canNextPage}
						className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r dark:bg-gray-800 dark:text-white"
					>
						Next
					</button>
				</div>
			</div>
		</>
	)
}
