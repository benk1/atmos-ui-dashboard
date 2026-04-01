import { lazy, Suspense, type JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingState from '../../components/feedback/LoadingState';

const DashboardPage = lazy(
	() => import('../../features/dashboard/pages/DashboardPage'),
);
const DevicesPage = lazy(
	() => import('../../features/devices/pages/DevicesPage'),
);
const DeviceDetailsPage = lazy(
	() => import('../../features/devices/pages/DeviceDetailsPage'),
);
const StationsPage = lazy(
	() => import('../../features/stations/pages/StationsPage'),
);
const StationDetailsPage = lazy(
	() => import('../../features/stations/pages/StationDetailsPage'),
);
const SoundingsPage = lazy(
	() => import('../../features/soundings/pages/SoundingsPage'),
);
const SoundingDetailsPage = lazy(
	() => import('../../features/soundings/pages/SoundingDetailsPage'),
);
const AlertsPage = lazy(() => import('../../features/alerts/pages/AlertsPage'));
const AlertDetailsPage = lazy(
	() => import('../../features/alerts/pages/AlertDetailsPage'),
);
const NotFoundPage = lazy(() => import('./NotFoundPage'));

export default function AppRoutes(): JSX.Element {
	return (
		<Suspense fallback={<LoadingState message="Loading page..." />}>
			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/devices" element={<DevicesPage />} />
				<Route path="/devices/:id" element={<DeviceDetailsPage />} />
				<Route path="/stations" element={<StationsPage />} />
				<Route path="/stations/:id" element={<StationDetailsPage />} />
				<Route path="/soundings" element={<SoundingsPage />} />
				<Route path="/soundings/:id" element={<SoundingDetailsPage />} />
				<Route path="/alerts" element={<AlertsPage />} />
				<Route path="/alerts/:id" element={<AlertDetailsPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Suspense>
	);
}
