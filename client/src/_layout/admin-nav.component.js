import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

import './admin-nav.styles.scss';

export const AdminNav = () => {
	return (
		<div className='userNav'>
			<Paper square>
				<MenuList>
					<MenuItem component={Link} to='/admin/dashboard'>
						Dashboard
					</MenuItem>

					<MenuItem component={Link} to='/admin/product'>
						Product
					</MenuItem>
					<MenuItem component={Link} to='/admin/products'>
						Products
					</MenuItem>
					<MenuItem component={Link} to='/admin/category'>
						Category
					</MenuItem>
					<MenuItem component={Link} to='/admin/sub'>
						Sub Category
					</MenuItem>
					<MenuItem component={Link} to='/admin/coupon'>
						Coupon
					</MenuItem>
					<MenuItem component={Link} to='/user/password'>
						Password
					</MenuItem>
				</MenuList>
			</Paper>
		</div>
	);
};
