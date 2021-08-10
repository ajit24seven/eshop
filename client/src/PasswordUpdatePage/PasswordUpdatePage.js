import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import { toasterActions } from '../_actions';
import { userService } from '../_services';
import { UserNav } from '../_layout';
import './password-update.styles.scss';

function PasswordUpdatePage() {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		userService
			.updatePassword(password)
			.then((response) => {
				dispatch(
					toasterActions.success('Password updated successfully')
				);
				setLoading(false);
				setPassword('');
			})
			.catch((error) => {
				dispatch(toasterActions.error(error.message));
			});
	};

	return (
		<>
			<UserNav></UserNav>
			<main className='updatePassword'>
				<Grid container justifyContent='center' alignItems='center'>
					<Grid item xs={5}>
						<form noValidate>
							<Typography variant='h6' noWrap>
								Password Update
							</Typography>

							<TextField
								fullWidth={true}
								label='Password'
								value={password}
								type='password'
								variant='standard'
								onChange={(e) => setPassword(e.target.value)}
							/>

							<Button
								className='submit'
								fullWidth={true}
								variant='contained'
								size='medium'
								color='primary'
								type='submit'
								disabled={loading}
								onClick={handleSubmit}
							>
								<label className='loaderContainer'>
									{loading && (
										<CircularProgress
											className='loader'
											color='inherit'
											size={20}
											thickness={4}
										/>
									)}
									Submit
								</label>
							</Button>
						</form>
					</Grid>
				</Grid>
			</main>
		</>
	);
}

export default PasswordUpdatePage;
