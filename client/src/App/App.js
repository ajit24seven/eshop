import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Toaster } from '../_components';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import RegisterCompletePage from '../RegisterCompletePage';
import ForgotPasswordPage from '../ForgotPasswordPage';
import HistoryPage from '../HistoryPage';
import { userActions } from '../_actions';
import { userService } from '../_services';
import { auth } from '../_config';
import { useDispatch } from 'react-redux';
import { PrivateRoute, UserRoute, AdminRoute } from '../_components/';
import PasswordUpdatePage from '../PasswordUpdatePage';
import WishListPage from '../WishListPage';
import AdminPage from '../AdminDashboard';

import Grid from '@mui/material/Grid';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				const response = await userService.currentUser(
					idTokenResult.token
				);
				if (response && response.data) {
					const { name, email, role, _id } = response.data;
					dispatch(
						userActions.success({
							email,
							name,
							role,
							_id,
							token: idTokenResult.token,
						})
					);
				}
			}
		});
		return () => unsubscribe;
	}, [dispatch]);

	return (
		<Fragment>
			<Toaster></Toaster>

			<Grid container>
				<Grid item xs='12' sx={{ marginTop: '62px', padding: '12px' }}>
					<Switch>
						<Route exact path='/' component={HomePage} />
						<PrivateRoute exact path='/login' comp={LoginPage} />
						<PrivateRoute path='/register' comp={RegisterPage} />
						<PrivateRoute
							path='/register/complete'
							comp={RegisterCompletePage}
						/>
						<PrivateRoute
							path='/forgot/password'
							comp={ForgotPasswordPage}
						/>
						<UserRoute
							path='/user/history'
							component={HistoryPage}
						/>
						<UserRoute
							path='/user/password'
							component={PasswordUpdatePage}
						/>
						<UserRoute
							path='/user/wishlist'
							component={WishListPage}
						/>
						<AdminRoute path='/admin' component={AdminPage} />
					</Switch>
				</Grid>
			</Grid>
		</Fragment>
	);
}

export default App;
