import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { toasterActions } from '../_actions';
import { userService } from '../_services';
import { UserNav } from '../_layout';
import Grid from '@mui/material/Grid';
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
			<Grid item xs={12} md={3}>
				<UserNav></UserNav>
			</Grid>
			<Grid item xs={12} md={9}>
				<Grid item xs={12} md={7}>
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
							sx={{ marginTop: '10px' }}
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
		</>
	);
}

export default PasswordUpdatePage;
