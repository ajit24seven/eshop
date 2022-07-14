import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';

const CategoryList = ({
	setName,
	setSlug,
	setIsUpdate,
	categories,
	handleRemoveCategory,
	setOpen,
}) => {
	const renderRow = (props) => {
		const { index, style } = props;

		return (
			<>
				<ListItem
					style={style}
					key={index}
					component='div'
					disablePadding
					elevation={1}
					secondaryAction={
						<>
							<IconButton
								edge='end'
								onClick={() => {
									setName(categories[index].name);
									setSlug(categories[index].slug);
									setIsUpdate(true);
									setOpen(true);
								}}
								aria-label='edit'
							>
								<EditIcon />
							</IconButton>
							<IconButton
								sx={{ marginLeft: '15px' }}
								edge='end'
								onClick={(event) =>
									handleRemoveCategory(
										event,
										categories[index].slug,
										categories[index]._id
									)
								}
								aria-label='delete'
							>
								<DeleteIcon />
							</IconButton>
						</>
					}
				>
					<ListItemText primary={categories[index].name} />
				</ListItem>
			</>
		);
	};

	return (
		<Box
			sx={{
				width: '100%',
				height: 400,
				clear: 'both',
				bgcolor: 'background.paper',
				marginTop: '30px',
				float: 'left',
			}}
		>
			<FixedSizeList
				height={500}
				itemSize={46}
				itemCount={categories.length}
			>
				{renderRow}
			</FixedSizeList>
		</Box>
	);
};

export default CategoryList;
