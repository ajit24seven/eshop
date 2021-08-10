import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user
	? {
			loading: false,
			user,
			error: '',
	  }
	: {
			loading: false,
			user: {},
			error: '',
	  };

export function authentication(state = initialState, action) {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case userConstants.LOGIN_SUCCESS:
			return {
				loading: false,
				user: action.user,
				error: '',
			};
		case userConstants.LOGIN_FAILURE:
			return {
				loading: false,
				user: {},
				error: action.error,
			};
		case userConstants.LOGOUT:
			return {};
		default:
			return state;
	}
}
