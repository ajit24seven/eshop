import { auth, googleAuthProvider } from '../_config';
import firebase from 'firebase';
import axios from 'axios';

const login = async (email, password) => {
	try {
		const authResult = await auth.signInWithEmailAndPassword(
			email,
			password
		);
		const { user } = authResult;
		const idTokenResult = await user.getIdTokenResult();
		const response = await createOrUpdateUser(idTokenResult.token);
		return {
			user: response.data,
			token: idTokenResult.token,
		};
	} catch (error) {
		throw new Error(error);
	}
};

const googleLogin = async () => {
	try {
		const authResult = await auth.signInWithPopup(googleAuthProvider);
		const { user } = authResult;
		const idTokenResult = await user.getIdTokenResult();

		const response = await createOrUpdateUser(idTokenResult.token);
		return {
			user: response.data,
			token: idTokenResult.token,
		};
	} catch (error) {
		throw new Error(error);
	}
};

const logout = () => {
	firebase.auth().signOut();
	window.localStorage.removeItem('isLoggedIn');
};

const register = async (email) => {
	const config = {
		url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
		handleCodeInApp: true,
	};
	try {
		await auth.sendSignInLinkToEmail(email, config);
		window.localStorage.setItem('emailForSignIn', email);
	} catch (error) {
		throw new Error(error);
	}
};

const completeRegistration = async (email, password) => {
	try {
		const result = await auth.signInWithEmailLink(
			email,
			window.location.href
		);

		if (result.user.emailVerified) {
			window.localStorage.removeItem('emailForSignIn', email);

			const user = auth.currentUser;
			await user.updatePassword(password);
			const idTokenResult = await user.getIdTokenResult();
			const response = await createOrUpdateUser(idTokenResult.token);
			return {
				user: response.data,
				token: idTokenResult.token,
			};
		}
	} catch (error) {
		throw new Error(error);
	}
};

const forgotPassword = async (email) => {
	if (!email) {
		return;
	}

	const config = {
		url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
		handleCodeInApp: true,
	};
	try {
		await auth.sendPasswordResetEmail(email, config);
	} catch (error) {
		throw new Error(error);
	}
};

const updatePassword = async (password) => {
	if (!password) {
		return;
	}

	try {
		await auth.currentUser.updatePassword(password);
	} catch (error) {
		throw new Error(error);
	}
};

const isLoggedIn = () => {
	if (window.localStorage.getItem('isLoggedIn')) {
		return Boolean(window.localStorage.getItem('isLoggedIn'));
	}
};

const createOrUpdateUser = (authToken) => {
	return axios.post(
		process.env.REACT_APP_API_BASE_PATH + '/create-or-update-user',
		{},
		{
			headers: {
				authToken: authToken,
			},
		}
	);
};

const currentUser = (authToken) => {
	return axios.post(
		process.env.REACT_APP_API_BASE_PATH + '/current-user',
		{},
		{
			headers: {
				authToken: authToken,
			},
		}
	);
};

const currentAdmin = (authToken) => {
	return axios.post(
		process.env.REACT_APP_API_BASE_PATH + '/current-admin',
		{},
		{
			headers: {
				authToken: authToken,
			},
		}
	);
};

export const userService = {
	login,
	googleLogin,
	register,
	completeRegistration,
	logout,
	forgotPassword,
	updatePassword,
	isLoggedIn,
	createOrUpdateUser,
	currentUser,
	currentAdmin,
};
