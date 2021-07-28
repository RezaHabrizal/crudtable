export function setProducts(payload) {
	return function (dispatch) {
		dispatch({ type: "SET_PRODUCTS", payload })
	}
}

export function addProductAsync(payload) {
	return function (dispatch) {
		dispatch({ type: "ADD_PRODUCT", payload })
	}
}

export function deleteProduct(namaBarang) {
	return function (dispatch) {
		dispatch({ type: "DELETE_PRODUCT", payload: namaBarang })
	}
}
