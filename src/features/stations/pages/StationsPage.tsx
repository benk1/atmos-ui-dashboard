import type { JSX } from 'react';
import EmptyState from '../../../components/feedback/EmptyState';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import StationList from '../components/StationList';
import { useStationFilters } from '../hooks/useStationFilters';
import { useStations } from '../hooks/useStations';
import StationFilters from '../components/StationFilters';

export default function StationsPage(): JSX.Element {
	const { stations, isLoading, error } = useStations();

	const {
		searchTerm,
		selectedStatuses,
		launchModeFilter,
		sortOption,
		setSearchTerm,
		toggleStatus,
		clearStatuses,
		setLaunchModeFilter,
		setSortOption,
		filteredStations,
	} = useStationFilters(stations);

	return (
		<section className="page-section" aria-labelledby="stations-page-title">
			<div className="page-section__header">
				<h2 id="stations-page-title">Stations</h2>
				<p className="page-section__description">
					View station configuration, system type, launch mode, and maintenance
					information.
				</p>
			</div>

			{isLoading ? (
				<LoadingState message="Loading stations..." />
			) : error ? (
				<ErrorState message={error} />
			) : (
				<>
					<StationFilters
						searchTerm={searchTerm}
						selectedStatuses={selectedStatuses}
						launchModeFilter={launchModeFilter}
						sortOption={sortOption}
						onSearchChange={setSearchTerm}
						onToggleStatus={toggleStatus}
						onClearStatuses={clearStatuses}
						onLaunchModeChange={setLaunchModeFilter}
						onSortChange={setSortOption}
						totalCount={stations.length}
						filteredCount={filteredStations.length}
					/>

					{filteredStations.length === 0 ? (
						<EmptyState message="No stations match the current filters." />
					) : (
						<StationList stations={filteredStations} />
					)}
				</>
			)}
		</section>
	);
}
