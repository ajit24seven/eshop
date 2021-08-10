import { userConstants } from '../_constants';
import { userService } from '../_services';
import { toasterActions } from '../_actions';

export const userActions = {
	register,
	completeRegistration,
	loginWithEmailAndPassword,
	loginWithGoogle,
	logout,
	success,
};

function register(email) {
	return (dispatch) => {
		dispatch(regRequest());
		userService
			.register(email)
			.then(() => {
				dispatch(regSuccess());
				dispatch(
					toasterActions.success(
						'Please check your mail to complete your registration'
					)
				);
			})
			.catch((error) => {
				dispatch(regFailure(error.message));
				dispatch(toasterActions.error(error.message));
			});
	};
	function regRequest() {
		return { type: userConstants.REGISTER_REQUEST };
	}
	function regSuccess() {
		return { type: userConstants.REGISTER_SUCCESS };
	}
	function regFailure() {
		return { type: userConstants.REGISTER_FAILURE };
	}
}

function completeRegistration(email, password) {
	return (dispatch) => {
		dispatch(request());
		userService
			.completeRegistration(email, password)
			.then((response) => {
				const { name, email, role, _id } = response.user;
				dispatch(
					success({
						email,
						name,
						role,
						_id,
						token: response.token,
					})
				);
				dispatch(toasterActions.success('Registration successful'));
			})
			.catch((error) => {
				dispatch(failure(error.message));
				dispatch(toasterActions.error(error.message));
			});
	};
}

function loginWithEmailAndPassword(email, password) {
	return (dispatch) => {
		dispatch(request());
		userService.login(email, password).then(
			(response) => {
				const { name, email, role, _id } = response.user;
				dispatch(
					success({
						email,
						name,
						role,
						_id,
						token: response.token,
					})
				);
				window.localStorage.setItem('isLoggedIn', true);
			},
			(error) => {
				dispatch(failure(error.message));
				dispatch(toasterActions.error(error.message));
			}
		);
	};
}

function loginWithGoogle() {
	return (dispatch) => {
		userService.googleLogin().then(
			(response) => {
				const { name, email, role, _id } = response.user;
				dispatch(
					success({
						email,
						name,
						role,
						_id,
						token: response.token,
					})
				);
				window.localStorage.setItem('isLoggedIn', true);
			},
			(error) => {
				dispatch(failure(error.message));
				dispatch(toasterActions.error(error.message));
			}
		);
	};
}

function request() {
	return { type: userConstants.LOGIN_REQUEST };
}
function success(user) {
	return { type: userConstants.LOGIN_SUCCESS, user };
}
function failure(error) {
	return { type: userConstants.LOGIN_FAILURE, error };
}

function logout() {
	userService.logout();
	return {
		type: userConstants.LOGOUT,
	};
}
