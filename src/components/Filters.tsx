import React from 'react';

interface FiltersProps {
	onNameChange: (value: string) => void;
	onCityChange: (value: string) => void;
	highlightOldest: boolean;
	toggleHighlight: () => void;
	cities: string[];
	onReset: () => void;
}

const Filters: React.FC<FiltersProps> = ({
	onNameChange,
	onCityChange,
	highlightOldest,
	toggleHighlight,
	cities,
	onReset,
}) => {
	return (
		<div className="filters">
			<input
				id="name-filter"
				type="text"
				placeholder="Search by name"
				onChange={(e) => onNameChange(e.target.value)}
				className="filter-input"
			/>
			<select
				id="city-dropdown"
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
			<button onClick={onReset} className="reset-button">
				Reset
			</button>
		</div>
	);
};

export default Filters;
