import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';

import './user-nav.styles.scss';

export const UserNav = () => {
	return (
		<div className='userNav'>
			<Paper square>
				<MenuList>
					<MenuItem component={Link} to='/user/history'>
						History
					</MenuItem>

					<MenuItem component={Link} to='/user/password'>
						Password
					</MenuItem>
					<MenuItem component={Link} to='/user/wishlist'>
						Wishlist
					</MenuItem>
				</MenuList>
			</Paper>
		</div>
	);
};
