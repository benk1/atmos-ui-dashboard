// import type { JSX } from 'react';
// import type { DeviceStatus } from '../types/device';

// type StatusFilter = 'all' | DeviceStatus;

// type DeviceFiltersProps = {
// 	searchTerm: string;
// 	statusFilter: StatusFilter;
// 	onSearchChange: (value: string) => void;
// 	onStatusChange: (value: StatusFilter) => void;
// 	totalCount: number;
// 	filteredCount: number;
// };

// export default function DeviceFilters({
// 	searchTerm,
// 	statusFilter,
// 	onSearchChange,
// 	onStatusChange,
// 	totalCount,
// 	filteredCount,
// }: DeviceFiltersProps): JSX.Element {
// 	return (
// 		<section className="panel" aria-labelledby="device-filters-title">
// 			<div className="filters">
// 				<div className="filters__header">
// 					<h3 id="device-filters-title" className="filters__title">
// 						Filter Devices
// 					</h3>
// 					<p className="filters__summary">
// 						Showing {filteredCount} of {totalCount} devices
// 					</p>
// 				</div>

// 				<div className="filters__controls">
// 					<div className="form-field">
// 						<label htmlFor="device-search" className="form-field__label">
// 							Search
// 						</label>
// 						<input
// 							id="device-search"
// 							type="search"
// 							className="form-field__input"
// 							placeholder="Search by name, model, type or radiosonde"
// 							value={searchTerm}
// 							onChange={(event) => onSearchChange(event.target.value)}
// 						/>
// 					</div>

// 					<div className="form-field">
// 						<label htmlFor="device-status-filter" className="form-field__label">
// 							Status
// 						</label>
// 						<select
// 							id="device-status-filter"
// 							className="form-field__input"
// 							value={statusFilter}
// 							onChange={(event) =>
// 								onStatusChange(event.target.value as StatusFilter)
// 							}
// 						>
// 							<option value="all">All</option>
// 							<option value="online">Online</option>
// 							<option value="offline">Offline</option>
// 							<option value="maintenance">Maintenance</option>
// 							<option value="degraded">Degraded</option>
// 						</select>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// }
import type { DeviceStatus } from '../types/device';
import type { JSX } from 'react';

type SortOption = 'name-asc' | 'signal-desc' | 'signal-asc' | 'last-seen-desc';

type DeviceFiltersProps = {
	searchTerm: string;
	selectedStatuses: DeviceStatus[];
	sortOption: SortOption;
	onSearchChange: (value: string) => void;
	onToggleStatus: (status: DeviceStatus) => void;
	onClearStatuses: () => void;
	onSortChange: (value: SortOption) => void;
	totalCount: number;
	filteredCount: number;
};

const statusOptions: DeviceStatus[] = [
	'online',
	'offline',
	'maintenance',
	'degraded',
];

export default function DeviceFilters({
	searchTerm,
	selectedStatuses,
	sortOption,
	onSearchChange,
	onToggleStatus,
	onClearStatuses,
	onSortChange,
	totalCount,
	filteredCount,
}: DeviceFiltersProps): JSX.Element {
	return (
		<section className="panel" aria-labelledby="device-filters-title">
			<div className="filters">
				<div className="filters__header">
					<div>
						<h3 id="device-filters-title" className="filters__title">
							Filter Devices
						</h3>
						<p className="filters__summary">
							Showing {filteredCount} of {totalCount} devices
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
						<label htmlFor="device-search" className="form-field__label">
							Search
						</label>
						<input
							id="device-search"
							type="search"
							className="form-field__input"
							placeholder="Search by name, model, type or radiosonde"
							value={searchTerm}
							onChange={(event) => onSearchChange(event.target.value)}
						/>
					</div>

					<div className="form-field">
						<label htmlFor="device-sort" className="form-field__label">
							Sort by
						</label>
						<select
							id="device-sort"
							className="form-field__input"
							value={sortOption}
							onChange={(event) =>
								onSortChange(event.target.value as SortOption)
							}
						>
							<option value="name-asc">Name (A–Z)</option>
							<option value="signal-desc">Signal Quality (High to Low)</option>
							<option value="signal-asc">Signal Quality (Low to High)</option>
							<option value="last-seen-desc">Last Seen (Newest First)</option>
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
