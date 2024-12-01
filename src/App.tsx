import React, { useState, useEffect } from 'react';
import Filters from './components/Filters';
import CustomerTable from './components/CustomerTable';
import axios from 'axios';
import './App.css';

interface Customer {
	id: number;
	firstName: string;
	lastName: string;
	city: string;
	birthDate: string;
}

const App: React.FC = () => {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
	const [nameFilter, setNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');

	useEffect(() => {
		axios.get('https://dummyjson.com/users').then((response) => {
			const users = response.data.users.map((user: any) => ({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				city: user.address.city,
				birthDate: user.birthDate,
			}));
			setCustomers(users);
			setFilteredCustomers(users);
		});
	}, []);

	useEffect(() => {
		let filtered = customers.filter(
			(customer) =>
				customer.firstName
					.toLowerCase()
					.includes(nameFilter.toLowerCase()) ||
				customer.lastName
					.toLowerCase()
					.includes(nameFilter.toLowerCase())
		);
		if (cityFilter) {
			filtered = filtered.filter(
				(customer) => customer.city === cityFilter
			);
		}
		setFilteredCustomers(filtered);
	}, [nameFilter, cityFilter, customers]);

	return (
		<div className="app">
			<h1>Customer Management</h1>
			<Filters
				onNameChange={(value) => setNameFilter(value)}
				onCityChange={(value) => setCityFilter(value)}
				cities={[
					...new Set(customers.map((customer) => customer.city)),
				]}
			/>
			<CustomerTable customers={filteredCustomers} />
		</div>
	);
};

export default App;
