import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Paper from '@mui/material/Paper';
import './admin-nav.styles.scss';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';

export const AdminNav = ({ open }) => {
	const [visible, setVisible] = React.useState(false);

	const handleClick = () => {
		setVisible(!visible);
	};

	const adminNav = [
		{
			link: '/admin/dashboard',
			label: 'Dashboard',
			children: [],
		},
		{
			link: '',
			label: 'Products',
			children: [
				{
					link: '/admin/products',
					label: 'All Products',
				},
				{
					link: '/admin/products/addProduct',
					label: 'Add Product',
				},
			],
		},
		{
			link: '/admin/categories',
			label: 'Categories',
			children: [],
		},
		{
			link: '/admin/orders',
			label: 'Orders',
			children: [],
		},
	];
	return (
		<Paper square>
			<List>
				{adminNav.map((menu) => (
					<>
						{menu.children.length ? (
							<>
								<ListItem disablePadding>
									<ListItemButton onClick={handleClick}>
										<ListItemIcon>
											<InboxIcon />
										</ListItemIcon>
										<ListItemText
											primary={menu.label}
											sx={{ opacity: open ? 1 : 0 }}
										/>
									</ListItemButton>
								</ListItem>

								<Collapse
									in={visible}
									timeout='auto'
									unmountOnExit
								>
									{menu.children.map((childMenu) => (
										<ListItemButton
											sx={{ pl: 4 }}
											component={Link}
											to={childMenu.link}
										>
											<ListItemIcon>
												<StarBorder />
											</ListItemIcon>
											<ListItemText
												primary={childMenu.label}
											/>
										</ListItemButton>
									))}
								</Collapse>
							</>
						) : (
							<ListItem disablePadding>
								<ListItemButton component={Link} to={menu.link}>
									<ListItemIcon>
										<InboxIcon />
									</ListItemIcon>
									<ListItemText
										primary={menu.label}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						)}
					</>
				))}
			</List>
		</Paper>
	);
};
