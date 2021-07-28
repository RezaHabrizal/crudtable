import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

let initalState = {
	products: []
}

function reducer(state = initalState, action) {
	const { type, payload } = action
	switch (type) {
		case "SET_PRODUCTS":
			return { ...state, products: payload }
		case "ADD_PRODUCT":
			return { ...state, products: state.products.concat(payload) }
		case "DELETE_PRODUCT":
			return {
				...state,
				products: state.products.filter(
					(product) => product.namaBarang !== payload
				)
			}
		default:
			return state
	}
}

let store = createStore(reducer, applyMiddleware(thunk))

export default store
