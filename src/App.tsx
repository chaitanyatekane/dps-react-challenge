import React from 'react';
import Filters from './components/Filters';
import CustomerTable from './components/CustomerTable';
import './App.css';

const App: React.FC = () => {
	return (
		<div className="app">
			<h1>Customer Management</h1>
			<Filters />
			<CustomerTable />
		</div>
	);
};

export default App;
