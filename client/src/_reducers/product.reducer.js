import { productConstants } from '../_constants';

const initialState = {
	loading: false,
	data: [],
	error: '',
	success: false,
};

export function products(state = initialState, action) {
	switch (action.type) {
		case productConstants.PRODUCT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case productConstants.PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.data.product,
				success: action.data.success,
				error: '',
			};
		case productConstants.PRODUCT_FAILURE:
			return {
				...state,
				loading: false,
				data: [],
				error: action.error,
				success: false,
			};
		default:
			return state;
	}
}
