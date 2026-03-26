// import type { JSX } from 'react';
// import DeviceFilters from '../components/DeviceFilters';
// import DeviceList from '../components/DeviceList';
// import { useDeviceFilters } from '../hooks/useDeficeFilters';
// import { useDevices } from '../hooks/useDevices';

// export default function DevicesPage(): JSX.Element {
// 	const { devices, isLoading, error } = useDevices();

// 	const {
// 		searchTerm,
// 		statusFilter,
// 		setSearchTerm,
// 		setStatusFilter,
// 		filteredDevices,
// 	} = useDeviceFilters(devices);

// 	return (
// 		<section className="page-section" aria-labelledby="devices-page-title">
// 			<div className="page-section__header">
// 				<h2 id="devices-page-title">Devices</h2>
// 				<p className="page-section__description">
// 					Manage device configurations, statuses, and settings.
// 				</p>
// 			</div>

// 			{isLoading ? (
// 				<div className="panel" role="status" aria-live="polite">
// 					<p>Loading devices...</p>
// 				</div>
// 			) : error ? (
// 				<div className="panel" role="alert">
// 					<p>{error}</p>
// 				</div>
// 			) : (
// 				<>
// 					<DeviceFilters
// 						searchTerm={searchTerm}
// 						statusFilter={statusFilter}
// 						onSearchChange={setSearchTerm}
// 						onStatusChange={setStatusFilter}
// 						totalCount={devices.length}
// 						filteredCount={filteredDevices.length}
// 					/>

// 					{filteredDevices.length === 0 ? (
// 						<div className="panel">
// 							<p>No devices match the current filters.</p>
// 						</div>
// 					) : (
// 						<DeviceList devices={filteredDevices} />
// 					)}
// 				</>
// 			)}
// 		</section>
// 	);
// }

// import type { JSX } from 'react';
// import DeviceFilters from '../components/DeviceFilters';
// import DeviceList from '../components/DeviceList';
// import { useDeviceFilters } from '../hooks/useDeficeFilters';
// import { useDevices } from '../hooks/useDevices';

// export default function DevicesPage(): JSX.Element {
// 	const { devices, isLoading, error } = useDevices();

// 	const {
// 		searchTerm,
// 		selectedStatuses,
// 		setSearchTerm,
// 		toggleStatus,
// 		clearStatuses,
// 		filteredDevices,
// 	} = useDeviceFilters(devices);

// 	return (
// 		<section className="page-section" aria-labelledby="devices-page-title">
// 			<div className="page-section__header">
// 				<h2 id="devices-page-title">Devices</h2>
// 				<p className="page-section__description">
// 					Manage device configurations, statuses, and settings.
// 				</p>
// 			</div>

// 			{isLoading ? (
// 				<div className="panel" role="status" aria-live="polite">
// 					<p>Loading devices...</p>
// 				</div>
// 			) : error ? (
// 				<div className="panel" role="alert">
// 					<p>{error}</p>
// 				</div>
// 			) : (
// 				<>
// 					<DeviceFilters
// 						searchTerm={searchTerm}
// 						selectedStatuses={selectedStatuses}
// 						onSearchChange={setSearchTerm}
// 						onToggleStatus={toggleStatus}
// 						onClearStatuses={clearStatuses}
// 						totalCount={devices.length}
// 						filteredCount={filteredDevices.length}
// 					/>

// 					{filteredDevices.length === 0 ? (
// 						<div className="panel">
// 							<p>No devices match the current filters.</p>
// 						</div>
// 					) : (
// 						<DeviceList devices={filteredDevices} />
// 					)}
// 				</>
// 			)}
// 		</section>
// 	);
// }

import EmptyState from '../../../components/feedback/EmptyState';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import DeviceFilters from '../components/DeviceFilters';
import DeviceList from '../components/DeviceList';
import { useDevices } from '../hooks/useDevices';
import { useDeviceFilters } from '../hooks/useDeficeFilters';
import type { JSX } from 'react';

export default function DevicesPage(): JSX.Element {
	const { devices, isLoading, error } = useDevices();

	const {
		searchTerm,
		selectedStatuses,
		sortOption,
		setSearchTerm,
		toggleStatus,
		clearStatuses,
		setSortOption,
		filteredDevices,
	} = useDeviceFilters(devices);

	if (isLoading) {
		return <LoadingState message="Loading devices..." />;
	}

	if (error) {
		return <ErrorState message={error} />;
	}

	return (
		<section className="page-section" aria-labelledby="devices-page-title">
			<div className="page-section__header">
				<h2 id="devices-page-title">Devices</h2>
				<p className="page-section__description">
					Manage device configurations, statuses, and settings.
				</p>
			</div>

			<DeviceFilters
				searchTerm={searchTerm}
				selectedStatuses={selectedStatuses}
				sortOption={sortOption}
				onSearchChange={setSearchTerm}
				onToggleStatus={toggleStatus}
				onClearStatuses={clearStatuses}
				onSortChange={setSortOption}
				totalCount={devices.length}
				filteredCount={filteredDevices.length}
			/>

			{filteredDevices.length === 0 ? (
				<EmptyState message="No devices match the current filters." />
			) : (
				<DeviceList devices={filteredDevices} />
			)}
		</section>
	);
}
