import type { LaunchMode, StationStatus } from '../types/station';

type SortOption =
	| 'name-asc'
	| 'name-desc'
	| 'altitude-desc'
	| 'last-maintenance-desc';

type LaunchModeFilter = 'all' | LaunchMode;

type StationFiltersProps = {
	searchTerm: string;
	selectedStatuses: StationStatus[];
	launchModeFilter: LaunchModeFilter;
	sortOption: SortOption;
	onSearchChange: (value: string) => void;
	onToggleStatus: (status: StationStatus) => void;
	onClearStatuses: () => void;
	onLaunchModeChange: (value: LaunchModeFilter) => void;
	onSortChange: (value: SortOption) => void;
	totalCount: number;
	filteredCount: number;
};

const statusOptions: StationStatus[] = [
	'operational',
	'maintenance',
	'degraded',
];

export default function StationFilters({
	searchTerm,
	selectedStatuses,
	launchModeFilter,
	sortOption,
	onSearchChange,
	onToggleStatus,
	onClearStatuses,
	onLaunchModeChange,
	onSortChange,
	totalCount,
	filteredCount,
}: StationFiltersProps): JSX.Element {
	return (
		<section className="panel" aria-labelledby="station-filters-title">
			<div className="filters">
				<div className="filters__header">
					<div>
						<h3 id="station-filters-title" className="filters__title">
							Filter Stations
						</h3>
						<p className="filters__summary">
							Showing {filteredCount} of {totalCount} stations
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
						<label htmlFor="station-search" className="form-field__label">
							Search
						</label>
						<input
							id="station-search"
							type="search"
							className="form-field__input"
							placeholder="Search by name, city, code or system type"
							value={searchTerm}
							onChange={(event) => onSearchChange(event.target.value)}
						/>
					</div>

					<div className="form-field">
						<label htmlFor="station-launch-mode" className="form-field__label">
							Launch Mode
						</label>
						<select
							id="station-launch-mode"
							className="form-field__input"
							value={launchModeFilter}
							onChange={(event) =>
								onLaunchModeChange(event.target.value as LaunchModeFilter)
							}
						>
							<option value="all">All</option>
							<option value="manual">Manual</option>
							<option value="automatic">Automatic</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="station-sort" className="form-field__label">
							Sort by
						</label>
						<select
							id="station-sort"
							className="form-field__input"
							value={sortOption}
							onChange={(event) =>
								onSortChange(event.target.value as SortOption)
							}
						>
							<option value="name-asc">Name (A–Z)</option>
							<option value="name-desc">Name (Z–A)</option>
							<option value="altitude-desc">Altitude (High to Low)</option>
							<option value="last-maintenance-desc">
								Last Maintenance (Newest First)
							</option>
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
									{status.charAt(0).toUpperCase() + status.slice(1)}
								</span>
							</label>
						))}
					</div>
				</fieldset>
			</div>
		</section>
	);
}
