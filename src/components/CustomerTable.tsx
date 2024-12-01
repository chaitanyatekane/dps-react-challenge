import React from 'react';

const CustomerTable: React.FC = () => {
	return (
		<table className="customer-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>City</th>
					<th>Birthday</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>John Doe</td>
					<td>New York</td>
					<td>1990-01-01</td>
				</tr>
			</tbody>
		</table>
	);
};

export default CustomerTable;
