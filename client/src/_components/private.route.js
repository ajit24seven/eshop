import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userService } from '../_services';

export const PrivateRoute = ({ comp: Component, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state.authentication }));

	return (
		<Route
			{...rest}
			render={(props) => {
				const isLoggedIn = user && userService.isLoggedIn();

				if ((user && user.token && user.role) || isLoggedIn) {
					// not logged in so redirect to login page with the return url

					if (user.role === 'admin') {
						return (
							<Redirect
								to={{
									pathname: '/admin/dashboard',
									state: { from: props.location },
								}}
							/>
						);
					} else {
						return (
							<Redirect
								to={{
									pathname: '/user/history',
									state: { from: props.location },
								}}
							/>
						);
					}
				}

				// logged in so return component
				return <Component {...props} />;
			}}
		/>
	);
};
