import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Header } from '../_layout';
import { PrivateRoute, UserRoute, AdminRoute } from '../_components';
import AdminCategoryPage from './AdminCategoryPage';
import AdminProductPage from './AdminProductPage';
import AdminDashboardPage from './AdminDashboardPage';
import AdminAddProduct from './AdminAddProduct';
import { AdminNav } from '../_layout';
import Grid from '@mui/material/Grid';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch,
} from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

function AdminPage() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	let { path, url } = useRouteMatch();

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Header
				open={open}
				setOpen={setOpen}
				drawerWidth={drawerWidth}
			></Header>
			<Drawer variant='permanent' open={open}>
				<DrawerHeader>
					<IconButton onClick={() => setOpen(false)}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<AdminNav open={open}></AdminNav>
				<Divider />
			</Drawer>
			<Grid container>
				<Grid item xs='12'>
					<Switch>
						<AdminRoute exact path={path}>
							<h3>Please select a style.</h3>
						</AdminRoute>

						<AdminRoute
							path={`${path}/dashboard`}
							component={AdminDashboardPage}
						/>
						<AdminRoute
							exact
							path={`${path}/products`}
							component={AdminProductPage}
						/>
						<AdminRoute
							path={`${path}/products/addProduct`}
							component={AdminAddProduct}
						/>

						<AdminRoute
							path={`${path}/Categories`}
							component={AdminCategoryPage}
						/>
						<AdminRoute
							path={`${path}/orders`}
							component={AdminDashboardPage}
						/>
						<AdminRoute
							path={`${path}/users`}
							component={AdminDashboardPage}
						/>
						<AdminRoute
							path={`${path}/account`}
							component={AdminDashboardPage}
						/>
						<AdminRoute
							path={`${path}/coupon`}
							component={AdminDashboardPage}
						/>
					</Switch>
				</Grid>
			</Grid>
		</Box>
	);
}

export default AdminPage;
