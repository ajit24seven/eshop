import { categoryConstants } from '../_constants';

const initialState = {
	loading: false,
	data: {},
	error: '',
};

export function categories(state = initialState, action) {
	switch (action.type) {
		case categoryConstants.CATEGORY_REQUEST:
			return {
				...state,
				loading: true,
			};
		case categoryConstants.CATEGORY_SUCCESS:
			return {
				loading: false,
				data: action.data,
				error: '',
			};
		case categoryConstants.CATEGORY_FAILURE:
			return {
				loading: false,
				data: {},
				error: action.error,
			};
		default:
			return state;
	}
}
