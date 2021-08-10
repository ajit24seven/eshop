import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RedirectComponent from './redirect.component';
import { userService } from '../_services/user.service';

export const AdminRoute = ({ children, ...rest }) => {
	const [ok, setOk] = useState(false);
	const { user } = useSelector((state) => ({ ...state.authentication }));

	useEffect(() => {
		userService
			.currentAdmin(user.token)
			.then(() => {
				setOk(true);
			})
			.catch((error) => {
				setOk(false);
				console.log(error);
			});
	}, [user]);

	if (ok) {
		return <Route {...rest} render={() => children} />;
	} else {
		return <RedirectComponent />;
	}
};
