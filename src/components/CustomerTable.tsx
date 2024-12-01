import React from 'react';

interface Customer {
	id: number;
	firstName: string;
	lastName: string;
	city: string;
	birthDate: string;
	email: string;
	phone: string;
}

interface CustomerTableProps {
	customers: Customer[];
	highlightedIds: Set<number>;
	onViewProfile: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
	customers,
	highlightedIds,
	onViewProfile,
}) => {
	return (
		<table className="customer-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>City</th>
					<th>Birthday</th>
					<th>Actions</th>
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
						<td>
							<button
								onClick={() => onViewProfile(customer)}
								className="view-profile-button"
							>
								View Profile
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default CustomerTable;
