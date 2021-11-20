import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import './login.styles.scss';

function LoginPage({ history }) {
	const [email, setEmail] = useState('difisec548@cyadp.com');
	const [password, setPassword] = useState('`123456');
	const dispatch = useDispatch();
	const { authentication } = useSelector((state) => ({ ...state }));
	window.localStorage.removeItem('isLoggedIn');

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(userActions.loginWithEmailAndPassword(email, password));
	};

	const handleGoogleLogin = (event) => {
		event.preventDefault();
		dispatch(userActions.loginWithGoogle());
	};

	return (
		<div className='login'>
			<Grid container justifyContent='center' alignItems='center'>
				<Grid item xs={4}>
					<form noValidate>
						<Typography variant='h6' noWrap>
							Login
						</Typography>

						<TextField
							fullWidth={true}
							label='Email Address'
							value={email}
							type='email'
							onChange={(e) => setEmail(e.target.value)}
							variant='standard'
							autoFocus
						/>

						<TextField
							fullWidth={true}
							label='Password'
							value={password}
							type='password'
							variant='standard'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							fullWidth={true}
							variant='contained'
							size='medium'
							color='primary'
							type='submit'
							disabled={authentication.loading}
							onClick={handleSubmit}
						>
							<label className='loaderContainer'>
								{authentication.loading && (
									<CircularProgress
										className='loader'
										color='inherit'
										size={20}
										thickness={4}
									/>
								)}
								Login with email/password
							</label>
						</Button>

						<Button
							fullWidth={true}
							variant='contained'
							size='medium'
							color='secondary'
							startIcon={<GoogleIcon />}
							onClick={handleGoogleLogin}
						>
							Login with Google
						</Button>
						<Link
							component={RouterLink}
							to='/forgot/password'
							className='forgotPassword'
						>
							Forgot Password
						</Link>
					</form>
				</Grid>
			</Grid>
		</div>
	);
}

export default LoginPage;
