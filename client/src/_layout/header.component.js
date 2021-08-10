import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import logo from '../_assets/flipkart-logo.png';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Person from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../_services';
import { useHistory } from 'react-router-dom';
import { userActions } from '../_actions';

export const Header = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const { user } = useSelector((state) => ({ ...state.authentication }));
	const dispatch = useDispatch();
	const history = useHistory();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		dispatch(userActions.logout());
		handleClose();
		history.push('/login');
	};
	const isLoggedIn =
		(user && user.email && user.role) || userService.isLoggedIn();

	return (
		<div className='layout-header'>
			<AppBar position='static' color='primary'>
				<Link className='logo' to='/'>
					<img src={logo} alt='flipkar' />
				</Link>
				<div className='headerNav'>
					{!isLoggedIn && (
						<div>
							<Button
								component={Link}
								to='/login'
								variant='text'
								disableRipple={true}
								color='inherit'
								startIcon={<Person />}
							>
								Login
							</Button>
							<Button
								component={Link}
								to='/register'
								variant='text'
								disableRipple={true}
								color='inherit'
								startIcon={<PersonAdd />}
							>
								Register
							</Button>
						</div>
					)}

					{user && user.email && (
						<div>
							<span>{user.email.split('@')[0]}</span>
							<IconButton
								edge='end'
								aria-label='account of current user'
								aria-haspopup='true'
								color='inherit'
								title='account of current user'
								placement='bottom-start'
								onClick={handleClick}
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id='simple-menu'
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>
									Profile
								</MenuItem>
								<MenuItem onClick={handleClose}>
									My account
								</MenuItem>
								<MenuItem onClick={logout}>Logout</MenuItem>
							</Menu>
						</div>
					)}
				</div>
			</AppBar>
		</div>
	);
};
