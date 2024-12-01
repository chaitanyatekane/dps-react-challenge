import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from './components/Filters';
import CustomerTable from './components/CustomerTable';
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
	const [noResultsMessage, setNoResultsMessage] = useState('');
	const [loading, setLoading] = useState(true);

	// Fetch customers from API
	useEffect(() => {
		setLoading(true);
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
			setLoading(false);
		});
	}, []);

	// Debounce the name filter
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedNameFilter(nameFilter);
		}, 1000);
		return () => clearTimeout(timer); // Cleanup the timer on input change
	}, [nameFilter]);

	// Filter customers based on name and city
	useEffect(() => {
		if (loading) return;
		const activeFilter = debouncedNameFilter || nameFilter;
		let filtered = customers.filter(
			(customer) =>
				customer.firstName
					.toLowerCase()
					.includes(activeFilter.toLowerCase()) ||
				customer.lastName
					.toLowerCase()
					.includes(activeFilter.toLowerCase())
		);
		if (cityFilter) {
			filtered = filtered.filter(
				(customer) => customer.city === cityFilter
			);
		}
		setFilteredCustomers(filtered);
		// Set no results message
		if (filtered.length === 0) {
			if (activeFilter && cityFilter) {
				setNoResultsMessage(
					`No customers found matching "${activeFilter}" in "${cityFilter}".`
				);
			} else if (activeFilter) {
				setNoResultsMessage(
					`No customers found matching "${activeFilter}".`
				);
			} else if (cityFilter) {
				setNoResultsMessage(`No customers found in "${cityFilter}".`);
			} else {
				setNoResultsMessage('No customers found.');
			}
		} else {
			setNoResultsMessage('');
		}
	}, [debouncedNameFilter, cityFilter, customers, loading]);

	// Highlight oldest customers per city
	const highlightedIds = new Set<number>();
	if (highlightOldest && filteredCustomers.length > 0) {
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

	// Set message when no customers exist for highlight
	const highlightMessage =
		highlightOldest && filteredCustomers.length === 0
			? 'No customers to highlight for the selected filters.'
			: '';

	const handleReset = () => {
		setLoading(true);
		setNoResultsMessage('');
		setTimeout(() => {
			setNameFilter('');
			setCityFilter('');
			setHighlightOldest(false);
			setFilteredCustomers(customers);

			const cityDropdown = document.getElementById(
				'city-dropdown'
			) as HTMLSelectElement;
			const nameFilterInput = document.getElementById(
				'name-filter'
			) as HTMLInputElement;

			if (cityDropdown) cityDropdown.value = '';
			if (nameFilterInput) nameFilterInput.value = '';

			setLoading(false);
		}, 500);
	};

	return (
		<div className="app">
			<h1>Customer Management</h1>
			{loading ? (
				<p className="message">Loading customers...</p>
			) : (
				<>
					<Filters
						onNameChange={(value) => setNameFilter(value)}
						onCityChange={(value) => setCityFilter(value)}
						highlightOldest={highlightOldest}
						toggleHighlight={() =>
							setHighlightOldest(!highlightOldest)
						}
						cities={[
							...new Set(
								customers.map((customer) => customer.city)
							),
						]}
						onReset={handleReset}
					/>
					{noResultsMessage && (
						<p className="message">{noResultsMessage}</p>
					)}
					{highlightMessage && (
						<p className="message">{highlightMessage}</p>
					)}
					<CustomerTable
						customers={filteredCustomers}
						highlightedIds={highlightedIds}
					/>
				</>
			)}
		</div>
	);
};

export default App;
