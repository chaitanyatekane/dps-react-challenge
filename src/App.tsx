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
	const [debouncedNameFilter, setDebouncedNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);

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

	// Debounce the name filter
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedNameFilter(nameFilter);
		}, 1000);
		return () => clearTimeout(timer); // Cleanup the timer on input change
	}, [nameFilter]);

	useEffect(() => {
		let filtered = customers.filter(
			(customer) =>
				customer.firstName
					.toLowerCase()
					.includes(debouncedNameFilter.toLowerCase()) ||
				customer.lastName
					.toLowerCase()
					.includes(debouncedNameFilter.toLowerCase())
		);
		if (cityFilter) {
			filtered = filtered.filter(
				(customer) => customer.city === cityFilter
			);
		}
		setFilteredCustomers(filtered);
	}, [debouncedNameFilter, cityFilter, customers]);

	const highlightedIds = new Set<number>();
	if (highlightOldest) {
		const oldestByCity = new Map<string, Customer>();
		filteredCustomers.forEach((customer) => {
			const currentOldest = oldestByCity.get(customer.city);
			if (
				!currentOldest ||
				new Date(customer.birthDate) < new Date(currentOldest.birthDate)
			) {
				oldestByCity.set(customer.city, customer);
			}
		});
		oldestByCity.forEach((customer) => highlightedIds.add(customer.id));
	}

	return (
		<div className="app">
			<h1>Customer Management</h1>
			<Filters
				onNameChange={(value) => setNameFilter(value)}
				onCityChange={(value) => setCityFilter(value)}
				highlightOldest={highlightOldest}
				toggleHighlight={() => setHighlightOldest(!highlightOldest)}
				cities={[
					...new Set(customers.map((customer) => customer.city)),
				]}
			/>
			<CustomerTable
				customers={filteredCustomers}
				highlightedIds={highlightedIds}
			/>
		</div>
	);
};

export default App;
