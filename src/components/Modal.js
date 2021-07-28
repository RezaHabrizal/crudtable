import React, { useState } from "react"
import { addProductAsync, setProducts } from "../store/actions"
import { useDispatch, useSelector } from "react-redux"
import { rupiahFormater } from "../helpers/rupiahFormater"

export default function AddProductModal(props) {
	const [showModal, setShowModal] = useState(false)
	const products = useSelector((state) => state.products)
	const dispatch = useDispatch()
	const [namaBarang, setNamaBarang] = useState("")
	const [stok, setStock] = useState(0)
	const [fotoBarang, setFotoBarang] = useState("")
	const [hargaBeli, setHargaBeli] = useState("")
	const [hargaJual, setHargaJual] = useState("")

	const addProduct = () => {
		let flag = false
		products.forEach((el) => {
			if (el.namaBarang === namaBarang) {
				flag = true
			}
		})
		if (!fotoBarang.match(/\.(jpg|png)$/)) {
			return alert("format gambar hanya bisa .png atau .jpg")
		}
		if (flag) {
			return alert("nama barang sudah ada")
		}
		dispatch(
			addProductAsync({ fotoBarang, namaBarang, hargaBeli, hargaJual, stok })
		)
		setFotoBarang("")
		setNamaBarang("")
		setHargaBeli("")
		setHargaJual("")
		setStock(0)
		setShowModal(false)
	}

	const editProduct = () => {
		products.forEach((el) => {
			if (el.namaBarang === props.edit.namaBarang) {
				el.fotoBarang = fotoBarang ? fotoBarang : props.edit.fotoBarang
				el.namaBarang = namaBarang ? namaBarang : props.edit.namaBarang
				el.hargaBeli = hargaBeli ? hargaBeli : props.edit.hargaBeli
				el.hargaJual = hargaJual ? hargaJual : props.edit.hargaJual
				el.stok = stok ? stok : props.edit.stok
			}
		})
		dispatch(setProducts(products))
		setShowModal(false)
	}

	return (
		<>
			{props.edit ? (
				<button
					className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
					type="button"
					onClick={() => setShowModal(true)}
				>
					EDIT
				</button>
			) : (
				<button
					className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 mt-5 ml-5 mr-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
					type="button"
					onClick={() => setShowModal(true)}
				>
					ADD PRODUCT
				</button>
			)}
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-3xl font-semibold">
										{props.edit ? "EDIT PRODUK" : "TAMBAH PRODUK"}
									</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									>
										<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto">
									<form className="w-full max-w-lg">
										<div className="flex flex-wrap -mx-3 mb-6">
											<div className="w-full px-3">
												<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
													Foto Barang
												</label>
												<input
													onChange={(e) => setFotoBarang(e.target.value)}
													className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
													type="text"
													placeholder={
														props.edit
															? props.edit.fotoBarang
															: "hanya bisa foto dengan format .jpg dan .png"
													}
												/>
												<p className="text-gray-600 text-xs italic">
													Masukan sumber image : Please input source image
												</p>
											</div>
										</div>
										<div className="flex flex-wrap -mx-3 mb-6">
											<div className="w-full px-3">
												<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
													Nama Barang
												</label>
												<input
													onChange={(e) => setNamaBarang(e.target.value)}
													className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
													type="text"
													placeholder={
														props.edit ? props.edit.namaBarang : "Nama Barang"
													}
												/>
											</div>
										</div>
										<div className="flex flex-wrap -mx-3 mb-2">
											<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
												<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
													Harga Beli
												</label>
												<input
													onChange={(e) =>
														setHargaBeli(rupiahFormater(e.target.value))
													}
													className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
													type="number"
													placeholder={
														props.edit
															? props.edit.hargaBeli
															: "masukan harga beli"
													}
												/>
											</div>
											<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
												<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
													Harga Jual
												</label>
												<input
													onChange={(e) =>
														setHargaJual(rupiahFormater(e.target.value))
													}
													className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
													id="grid-city"
													type="number"
													placeholder={
														props.edit
															? props.edit.hargaJual
															: "masukan harga jual"
													}
												/>
											</div>
											<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
												<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
													Stok
												</label>
												<input
													onChange={(e) => setStock(e.target.value)}
													className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
													type="number"
													placeholder={
														props.edit ? props.edit.stok : "masukan stok barang"
													}
												/>
											</div>
										</div>
									</form>
								</div>
								{/*footer*/}
								<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => setShowModal(false)}
									>
										Close
									</button>
									<button
										className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => (props.edit ? editProduct() : addProduct())}
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	)
}
