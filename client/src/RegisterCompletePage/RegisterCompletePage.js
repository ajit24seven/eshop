import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import './register-complete.styles.scss';

const RegisterCompletePage = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { completeRegistration } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	useEffect(() => {
		const emailFromLocalStorage = window.localStorage.getItem(
			'emailForSignIn'
		);

		if (emailFromLocalStorage) {
			setEmail(emailFromLocalStorage);
		}
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		dispatch(userActions.completeRegistration(email, password));
	};

	return (
		<div className='register'>
			<Grid container justifyContent='center' alignItems='center'>
				<Grid item xs={4}>
					<form noValidate onSubmit={handleSubmit}>
						<Typography variant='h6'>
							Complete Registration
						</Typography>
						<TextField
							fullWidth={true}
							label='Email Address'
							variant='standard'
							value={email}
							type='email'
							autoComplete='none'
							disabled={true}
						/>
						<TextField
							fullWidth={true}
							label='Password'
							variant='standard'
							value={password}
							type='password'
							autoComplete='none'
							onChange={(event) =>
								setPassword(event.target.value)
							}
							autoFocus
						/>
						<Button
							fullWidth={true}
							variant='contained'
							size='medium'
							color='primary'
							type='submit'
							onClick={handleSubmit}
							disabled={completeRegistration.loading}
						>
							<label className='loaderContainer'>
								{completeRegistration.loading && (
									<CircularProgress
										className='loader'
										color='inherit'
										size={20}
										thickness={4}
									/>
								)}
								Complete Registration
							</label>
						</Button>
					</form>
				</Grid>
			</Grid>
		</div>
	);
};

export default RegisterCompletePage;
