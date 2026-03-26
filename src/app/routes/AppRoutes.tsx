import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingState from '../../components/feedback/LoadingState';
import type { JSX } from 'react';

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

export default function AppRoutes(): JSX.Element {
	return (
		<Suspense fallback={<LoadingState message="Loading page..." />}>
			<Routes>
				<Route path="/" element={<Navigate to="/devices" replace />} />
				<Route path="/devices" element={<DevicesPage />} />
				<Route path="/devices/:id" element={<DeviceDetailsPage />} />
				<Route path="/stations" element={<StationsPage />} />
				<Route path="/stations/:id" element={<StationDetailsPage />} />
			</Routes>
		</Suspense>
	);
}
