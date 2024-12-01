import React from 'react';

interface FiltersProps {
	onNameChange: (value: string) => void;
	onCityChange: (value: string) => void;
	cities: string[];
	highlightOldest: boolean;
	toggleHighlight: () => void;
}

const Filters: React.FC<FiltersProps> = ({
	onNameChange,
	onCityChange,
	highlightOldest,
	toggleHighlight,
	cities,
}) => {
	return (
		<div className="filters">
			<input
				type="text"
				placeholder="Search by name"
				onChange={(e) => onNameChange(e.target.value)}
				className="filter-input"
			/>
			<select
				onChange={(e) => onCityChange(e.target.value)}
				className="filter-dropdown"
			>
				<option value="">Select city</option>
				{cities.map((city) => (
					<option key={city} value={city}>
						{city}
					</option>
				))}
			</select>
			<label className="filter-checkbox">
				<input
					type="checkbox"
					checked={highlightOldest}
					onChange={toggleHighlight}
				/>
				Highlight oldest per city
			</label>
		</div>
	);
};

export default Filters;
