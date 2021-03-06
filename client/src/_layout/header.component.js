import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import logo from '../_assets/flipkart-logo.png';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Person from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../_services';
import { useHistory } from 'react-router-dom';
import { userActions } from '../_actions';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
export const Header = ({ setOpen, open, drawerWidth }) => {
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

	const AppBar = styled(MuiAppBar, {
		shouldForwardProp: (prop) => prop !== 'open',
	})(({ theme, open }) => ({
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(open && {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	}));

	return (
		<AppBar position='fixed' open={open}>
			<Toolbar>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={() => setOpen(true)}
					edge='start'
					sx={{
						marginRight: 5,
						...(open && { display: 'none' }),
					}}
				>
					<MenuIcon />
				</IconButton>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
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
									{user && user.role === 'subscriber' && (
										<MenuItem
											component={Link}
											onClick={handleClose}
											to='/user/history'
										>
											Dashboard
										</MenuItem>
									)}
									{user && user.role === 'admin' && (
										<MenuItem
											component={Link}
											onClick={handleClose}
											to='/admin/dashboard'
										>
											Dashboard
										</MenuItem>
									)}

									<MenuItem onClick={logout}>Logout</MenuItem>
								</Menu>
							</div>
						)}
					</div>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
