import type { JSX } from 'react';
import EmptyState from '../../../components/feedback/EmptyState';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import SoundingFilters from '../components/SoundingFilters';
import SoundingList from '../components/SoundingList';
import { useSoundingFilters } from '../hooks/useSoundingFilters';
import { useSoundings } from '../hooks/useSoundings';

export default function SoundingsPage(): JSX.Element {
	const { soundings, isLoading, error } = useSoundings();

	const {
		searchTerm,
		selectedStatuses,
		sortOption,
		setSearchTerm,
		toggleStatus,
		clearStatuses,
		setSortOption,
		filteredSoundings,
	} = useSoundingFilters(soundings);

	return (
		<section className="page-section" aria-labelledby="soundings-page-title">
			<div className="page-section__header">
				<h2 id="soundings-page-title">Soundings</h2>
				<p className="page-section__description">
					View sounding runs, observation metadata, atmospheric values, and
					quality information.
				</p>
			</div>

			{isLoading ? (
				<LoadingState message="Loading soundings..." />
			) : error ? (
				<ErrorState message={error} />
			) : (
				<>
					<SoundingFilters
						searchTerm={searchTerm}
						selectedStatuses={selectedStatuses}
						sortOption={sortOption}
						onSearchChange={setSearchTerm}
						onToggleStatus={toggleStatus}
						onClearStatuses={clearStatuses}
						onSortChange={setSortOption}
						totalCount={soundings.length}
						filteredCount={filteredSoundings.length}
					/>

					{filteredSoundings.length === 0 ? (
						<EmptyState message="No soundings match the current filters." />
					) : (
						<SoundingList soundings={filteredSoundings} />
					)}
				</>
			)}
		</section>
	);
}
