import { userConstants } from '../_constants';
export function completeRegistration(state = { loading: false }, action) {
	switch (action.type) {
		case userConstants.COMPLETE_REGISTER_REQUEST:
			return { loading: true };
		case userConstants.COMPLETE_REGISTER_SUCCESS:
			return { loading: false };
		case userConstants.COMPLETE_REGISTER_FAILURE:
			return { loading: false };
		default:
			return state;
	}
}
