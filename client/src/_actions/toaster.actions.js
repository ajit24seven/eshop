import { toasterConstants } from '../_constants';

export const toasterActions = {
	success,
	error,
	clear,
};

function success(message) {
	return { type: toasterConstants.SUCCESS, message };
}

function error(message) {
	return { type: toasterConstants.ERROR, message };
}

function clear() {
	return { type: toasterConstants.CLEAR };
}
