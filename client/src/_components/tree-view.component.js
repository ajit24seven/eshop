import * as React from 'react';
import PropTypes from 'prop-types';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
	const {
		classes,
		className,
		label,
		nodeId,
		icon: iconProp,
		expansionIcon,
		displayIcon,
	} = props;

	const {
		disabled,
		expanded,
		selected,
		focused,
		handleExpansion,
		handleSelection,
		preventSelection,
	} = useTreeItem(nodeId);

	const icon = iconProp || expansionIcon || displayIcon;

	const handleMouseDown = (event) => {
		preventSelection(event);
	};

	const handleExpansionClick = (event) => {
		handleExpansion(event);
	};

	const handleSelectionClick = (event) => {
		handleSelection(event);
	};

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className={clsx(className, classes.root, {
				[classes.expanded]: expanded,
				[classes.selected]: selected,
				[classes.focused]: focused,
				[classes.disabled]: disabled,
			})}
			onMouseDown={handleMouseDown}
			ref={ref}
		>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
			<div
				style={{ marginRight: '15px' }}
				onClick={handleExpansionClick}
				className={classes.iconContainer}
			>
				{icon}
			</div>

			<FormControlLabel control={<Checkbox />} label={label} />
		</div>
	);
});

const renderTree = (nodes) => (
	<TreeItem
		ContentComponent={CustomContent}
		key={nodes.slug}
		nodeId={nodes.slug}
		label={nodes.name}
	>
		{Array.isArray(nodes.children)
			? nodes.children.map((node) => renderTree(node))
			: null}
	</TreeItem>
);

export const IconExpansionTreeView = ({ data }) => {
	return (
		<TreeView
			aria-label='icon expansion'
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			sx={{ height: 249, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
		>
			{data.map((node) => renderTree(node))}
		</TreeView>
	);
};
