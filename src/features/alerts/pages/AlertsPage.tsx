import type { JSX } from 'react';
import EmptyState from '../../../components/feedback/EmptyState';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import AlertFilters from '../components/AlertFilters';
import AlertList from '../components/AlertList';
import { useAlertFilters } from '../hooks/useAlertFilters';
import { useAlerts } from '../hooks/useAlerts';

export default function AlertsPage(): JSX.Element {
	const { alerts, isLoading, error } = useAlerts();

	const {
		searchTerm,
		selectedSeverities,
		resolutionFilter,
		sortOption,
		setSearchTerm,
		toggleSeverity,
		clearSeverities,
		setResolutionFilter,
		setSortOption,
		filteredAlerts,
	} = useAlertFilters(alerts);

	return (
		<section className="page-section" aria-labelledby="alerts-page-title">
			<div className="page-section__header">
				<h2 id="alerts-page-title">Alerts</h2>
				<p className="page-section__description">
					View operational alerts, severity levels, affected stations/devices,
					and resolution state.
				</p>
			</div>

			{isLoading ? (
				<LoadingState message="Loading alerts..." />
			) : error ? (
				<ErrorState message={error} />
			) : (
				<>
					<AlertFilters
						searchTerm={searchTerm}
						selectedSeverities={selectedSeverities}
						resolutionFilter={resolutionFilter}
						sortOption={sortOption}
						onSearchChange={setSearchTerm}
						onToggleSeverity={toggleSeverity}
						onClearSeverities={clearSeverities}
						onResolutionChange={setResolutionFilter}
						onSortChange={setSortOption}
						totalCount={alerts.length}
						filteredCount={filteredAlerts.length}
					/>

					{filteredAlerts.length === 0 ? (
						<EmptyState message="No alerts match the current filters." />
					) : (
						<AlertList alerts={filteredAlerts} />
					)}
				</>
			)}
		</section>
	);
}
