import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Header } from '../_layout';
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
import AdminDashboard from '../AdminDashboard';

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
			<Header></Header>

			<Toaster></Toaster>
			<div className='container'>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<PrivateRoute exact path='/login' comp={LoginPage} />
					<PrivateRoute exact path='/register' comp={RegisterPage} />
					<PrivateRoute
						exact
						path='/register/complete'
						comp={RegisterCompletePage}
					/>
					<PrivateRoute
						exact
						path='/forgot/password'
						comp={ForgotPasswordPage}
					/>
					<UserRoute
						exact
						path='/user/history'
						component={HistoryPage}
					/>
					<UserRoute
						exact
						path='/user/password'
						component={PasswordUpdatePage}
					/>
					<UserRoute
						exact
						path='/user/wishlist'
						component={WishListPage}
					/>
					<AdminRoute
						exact
						path='/admin/dashboard'
						component={AdminDashboard}
					/>
				</Switch>
			</div>
		</Fragment>
	);
}
export default App;
