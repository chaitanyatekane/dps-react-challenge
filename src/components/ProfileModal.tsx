import React from 'react';
import './ProfileModal.css';

interface Customer {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	city: string;
	birthDate: string;
	address: string;
	company: string;
	username: string;
}

interface ProfileModalProps {
	customer: Customer;
	onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ customer, onClose }) => {
	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div className="profile-modal" onClick={handleOverlayClick}>
			<div className="profile-modal-content">
				<h2>Customer Profile</h2>
				<p>
					<strong>Name:</strong> {customer.firstName}{' '}
					{customer.lastName}
				</p>
				<p>
					<strong>Username:</strong> {customer.username}
				</p>
				<p>
					<strong>Email:</strong> {customer.email}
				</p>
				<p>
					<strong>Phone:</strong> {customer.phone}
				</p>
				<p>
					<strong>City:</strong> {customer.city}
				</p>
				<p>
					<strong>Address:</strong> {customer.address}
				</p>
				<p>
					<strong>Company:</strong> {customer.company}
				</p>
				<p>
					<strong>Birth Date:</strong> {customer.birthDate}
				</p>
				<button onClick={onClose} className="close-button">
					&times; {/* Close icon */}
				</button>
			</div>
		</div>
	);
};

export default ProfileModal;
