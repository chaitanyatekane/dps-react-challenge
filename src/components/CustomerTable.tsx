import React from 'react';

interface Customer {
	id: number;
	firstName: string;
	lastName: string;
	city: string;
	birthDate: string;
}

interface CustomerTableProps {
	customers: Customer[];
	highlightedIds: Set<number>;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
	customers,
	highlightedIds,
}) => {
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
				{customers.map((customer) => (
					<tr
						key={customer.id}
						className={
							highlightedIds.has(customer.id) ? 'highlighted' : ''
						}
					>
						<td>{`${customer.firstName} ${customer.lastName}`}</td>
						<td>{customer.city}</td>
						<td>{customer.birthDate}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default CustomerTable;
