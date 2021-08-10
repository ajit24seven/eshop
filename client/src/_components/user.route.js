import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RedirectComponent from './redirect.component';

export const UserRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state.authentication }));

	if (user && user.token) {
		return <Route {...rest} render={() => children} />;
	} else {
		return <RedirectComponent />;
	}
};
