import type { JSX } from 'react';
import type { SoundingStatus } from '../types/sounding';

type SortOption =
	| 'start-time-desc'
	| 'quality-desc'
	| 'altitude-desc'
	| 'sounding-number-asc';

type SoundingFiltersProps = {
	searchTerm: string;
	selectedStatuses: SoundingStatus[];
	sortOption: SortOption;
	onSearchChange: (value: string) => void;
	onToggleStatus: (status: SoundingStatus) => void;
	onClearStatuses: () => void;
	onSortChange: (value: SortOption) => void;
	totalCount: number;
	filteredCount: number;
};

const statusOptions: SoundingStatus[] = [
	'completed',
	'in-progress',
	'scheduled',
];

function formatStatusLabel(status: SoundingStatus): string {
	switch (status) {
		case 'in-progress':
			return 'In Progress';
		case 'scheduled':
			return 'Scheduled';
		case 'completed':
		default:
			return 'Completed';
	}
}

export default function SoundingFilters({
	searchTerm,
	selectedStatuses,
	sortOption,
	onSearchChange,
	onToggleStatus,
	onClearStatuses,
	onSortChange,
	totalCount,
	filteredCount,
}: SoundingFiltersProps): JSX.Element {
	return (
		<section className="panel" aria-labelledby="sounding-filters-title">
			<div className="filters">
				<div className="filters__header">
					<div>
						<h3 id="sounding-filters-title" className="filters__title">
							Filter Soundings
						</h3>
						<p className="filters__summary">
							Showing {filteredCount} of {totalCount} soundings
						</p>
					</div>

					<button
						type="button"
						className="filters__clear-button"
						onClick={onClearStatuses}
						disabled={selectedStatuses.length === 0}
					>
						Clear status filters
					</button>
				</div>

				<div className="filters__controls">
					<div className="form-field">
						<label htmlFor="sounding-search" className="form-field__label">
							Search
						</label>
						<input
							id="sounding-search"
							type="search"
							className="form-field__input"
							placeholder="Search by sounding number, operator, or radiosonde"
							value={searchTerm}
							onChange={(event) => onSearchChange(event.target.value)}
						/>
					</div>

					<div className="form-field">
						<label htmlFor="sounding-sort" className="form-field__label">
							Sort by
						</label>
						<select
							id="sounding-sort"
							className="form-field__input"
							value={sortOption}
							onChange={(event) =>
								onSortChange(event.target.value as SortOption)
							}
						>
							<option value="start-time-desc">Start Time (Newest First)</option>
							<option value="quality-desc">Quality Score (High to Low)</option>
							<option value="altitude-desc">Max Altitude (High to Low)</option>
							<option value="sounding-number-asc">Sounding Number (A–Z)</option>
						</select>
					</div>
				</div>

				<fieldset className="checkbox-group">
					<legend className="checkbox-group__legend">Status</legend>

					<div className="checkbox-group__options">
						{statusOptions.map((status) => (
							<label key={status} className="checkbox-option">
								<input
									type="checkbox"
									className="checkbox-option__input"
									checked={selectedStatuses.includes(status)}
									onChange={() => onToggleStatus(status)}
								/>
								<span className="checkbox-option__label">
									{formatStatusLabel(status)}
								</span>
							</label>
						))}
					</div>
				</fieldset>
			</div>
		</section>
	);
}
