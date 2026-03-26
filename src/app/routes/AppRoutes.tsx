import { Navigate, Route, Routes } from 'react-router-dom';
import DeviceDetailsPage from '../../features/devices/pages/DeviceDetailsPage';
import DevicesPage from '../../features/devices/pages/DevicesPage';
import StationsPage from '../../features/stations/pages/StationsPage';
import type { JSX } from 'react';

export default function AppRoutes(): JSX.Element {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/devices" replace />} />
			<Route path="/devices" element={<DevicesPage />} />
			<Route path="/devices/:id" element={<DeviceDetailsPage />} />
			<Route path="/stations" element={<StationsPage />} />
		</Routes>
	);
}
