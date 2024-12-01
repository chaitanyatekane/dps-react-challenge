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
		});
	}, []);

	return (
		<div className="app">
			<h1>Customer Management</h1>
			<Filters />
			<CustomerTable customers={customers} />
		</div>
	);
};

export default App;
