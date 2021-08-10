import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import './user-nav.styles.scss';

export const UserNav = () => {
	return (
		<div className='userNav'>
			<Paper square>
				<div className='avatar'>
					<Avatar>H</Avatar>
				</div>
				<Divider />
				<div className='menu'>
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
				</div>
			</Paper>
		</div>
	);
};
