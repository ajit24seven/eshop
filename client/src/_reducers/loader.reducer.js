import { loaderConstants } from '../_constants';

export function loader(state = { open: false }, action) {
	switch (action.type) {
		case loaderConstants.SHOW:
			return {
				open: true,
			};
		case loaderConstants.HIDE:
			return {
				open: false,
			};
		default:
			return state;
	}
}
