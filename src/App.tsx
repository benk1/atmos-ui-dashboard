import MainLayout from './components/layout/MainLayout';
import AppRoutes from './app/routes/AppRoutes';
import type { JSX } from 'react';

export default function App(): JSX.Element {
	return (
		<MainLayout>
			<AppRoutes />
		</MainLayout>
	);
}
