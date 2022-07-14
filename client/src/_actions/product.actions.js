import { productConstants } from '../_constants';
import { productService } from '../_services';
import { toasterActions } from '.';

export const productActions = {
	product,
};

function product() {
	return (dispatch) => {
		dispatch(regRequest());
		productService
			.getProducts()
			.then((response) => {
				dispatch(regSuccess(response.data));
			})
			.catch((error) => {
				dispatch(regFailure(error.message));
				dispatch(toasterActions.error(error.message));
			});
	};
	function regRequest() {
		return { type: productConstants.PRODUCT_REQUEST };
	}
	function regSuccess(data) {
		return { type: productConstants.PRODUCT_SUCCESS, data };
	}
	function regFailure(error) {
		return { type: productConstants.PRODUCT_FAILURE, error };
	}
}
