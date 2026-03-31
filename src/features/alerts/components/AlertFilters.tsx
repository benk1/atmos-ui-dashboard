import type { JSX } from 'react';
import type { AlertSeverity } from '../types/alert';

type ResolutionFilter = 'all' | 'open' | 'resolved';
type SortOption = 'created-desc' | 'severity-desc' | 'code-asc';

type AlertFiltersProps = {
	searchTerm: string;
	selectedSeverities: AlertSeverity[];
	resolutionFilter: ResolutionFilter;
	sortOption: SortOption;
	onSearchChange: (value: string) => void;
	onToggleSeverity: (severity: AlertSeverity) => void;
	onClearSeverities: () => void;
	onResolutionChange: (value: ResolutionFilter) => void;
	onSortChange: (value: SortOption) => void;
	totalCount: number;
	filteredCount: number;
};

const severityOptions: AlertSeverity[] = ['info', 'warning', 'critical'];

function formatSeverityLabel(severity: AlertSeverity): string {
	switch (severity) {
		case 'critical':
			return 'Critical';
		case 'warning':
			return 'Warning';
		case 'info':
		default:
			return 'Info';
	}
}

export default function AlertFilters({
	searchTerm,
	selectedSeverities,
	resolutionFilter,
	sortOption,
	onSearchChange,
	onToggleSeverity,
	onClearSeverities,
	onResolutionChange,
	onSortChange,
	totalCount,
	filteredCount,
}: AlertFiltersProps): JSX.Element {
	return (
		<section className="panel" aria-labelledby="alert-filters-title">
			<div className="filters">
				<div className="filters__header">
					<div>
						<h3 id="alert-filters-title" className="filters__title">
							Filter Alerts
						</h3>
						<p className="filters__summary">
							Showing {filteredCount} of {totalCount} alerts
						</p>
					</div>

					<button
						type="button"
						className="filters__clear-button"
						onClick={onClearSeverities}
						disabled={selectedSeverities.length === 0}
					>
						Clear severity filters
					</button>
				</div>

				<div className="filters__controls">
					<div className="form-field">
						<label htmlFor="alert-search" className="form-field__label">
							Search
						</label>
						<input
							id="alert-search"
							type="search"
							className="form-field__input"
							placeholder="Search by alert code or message"
							value={searchTerm}
							onChange={(event) => onSearchChange(event.target.value)}
						/>
					</div>

					<div className="form-field">
						<label htmlFor="alert-resolution" className="form-field__label">
							Resolution
						</label>
						<select
							id="alert-resolution"
							className="form-field__input"
							value={resolutionFilter}
							onChange={(event) =>
								onResolutionChange(event.target.value as ResolutionFilter)
							}
						>
							<option value="all">All</option>
							<option value="open">Open</option>
							<option value="resolved">Resolved</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="alert-sort" className="form-field__label">
							Sort by
						</label>
						<select
							id="alert-sort"
							className="form-field__input"
							value={sortOption}
							onChange={(event) =>
								onSortChange(event.target.value as SortOption)
							}
						>
							<option value="created-desc">Created (Newest First)</option>
							<option value="severity-desc">Severity (Highest First)</option>
							<option value="code-asc">Code (A–Z)</option>
						</select>
					</div>
				</div>

				<fieldset className="checkbox-group">
					<legend className="checkbox-group__legend">Severity</legend>

					<div className="checkbox-group__options">
						{severityOptions.map((severity) => (
							<label key={severity} className="checkbox-option">
								<input
									type="checkbox"
									className="checkbox-option__input"
									checked={selectedSeverities.includes(severity)}
									onChange={() => onToggleSeverity(severity)}
								/>
								<span className="checkbox-option__label">
									{formatSeverityLabel(severity)}
								</span>
							</label>
						))}
					</div>
				</fieldset>
			</div>
		</section>
	);
}
