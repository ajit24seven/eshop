import { toasterConstants } from '../_constants';

export function toaster(state = {}, action) {
	switch (action.type) {
		case toasterConstants.SUCCESS:
			return {
				severity: 'success',
				message: action.message,
				open: true,
			};
		case toasterConstants.ERROR:
			return {
				severity: 'error',
				message: action.message,
				open: true,
			};
		case toasterConstants.CLEAR:
			return {
				...state,
				open: false,
			};
		default:
			return state;
	}
}
