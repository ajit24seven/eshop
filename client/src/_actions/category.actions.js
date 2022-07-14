import { categoryConstants } from '../_constants';
import { categoryService } from '../_services';
import { toasterActions } from '.';

export const categoryActions = {
	category,
};

function category() {
	return (dispatch) => {
		dispatch(regRequest());
		categoryService
			.getCategories()
			.then((response) => {
				dispatch(regSuccess(response.data));
			})
			.catch((error) => {
				dispatch(regFailure(error.message));
				dispatch(toasterActions.error(error.message));
			});
	};
	function regRequest() {
		return { type: categoryConstants.CATEGORY_REQUEST };
	}
	function regSuccess(data) {
		return { type: categoryConstants.CATEGORY_SUCCESS, data };
	}
	function regFailure(error) {
		return { type: categoryConstants.CATEGORY_FAILURE, error };
	}
}
