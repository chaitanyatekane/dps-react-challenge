import React from 'react';

const Filters: React.FC = () => {
	return (
		<div className="filters">
			<input type="text" placeholder="Search by name" />
			<select>
				<option value="">Select city</option>
			</select>
			<label>
				<input type="checkbox" />
				Highlight oldest per city
			</label>
		</div>
	);
};

export default Filters;
