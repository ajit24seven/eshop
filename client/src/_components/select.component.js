import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export const SelectComponent = ({ label, list, value, setValue }) => {
	if (!list.length === 0) {
		return;
	}
	return (
		<FormControl fullWidth variant='standard'>
			<InputLabel>{label}</InputLabel>
			<Select
				onChange={(e) => setValue(e.target.value)}
				value={value}
				label='Category'
			>
				<MenuItem value=''>
					<em>Select</em>
				</MenuItem>
				{list.map((item) => (
					<MenuItem key={item._id} value={item._id}>
						{item.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
