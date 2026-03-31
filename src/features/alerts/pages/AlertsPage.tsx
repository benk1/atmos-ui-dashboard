import type { JSX } from 'react';
import EmptyState from '../../../components/feedback/EmptyState';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import AlertList from '../components/AlertList';
import { useAlerts } from '../hooks/useAlerts';

export default function AlertsPage(): JSX.Element {
	const { alerts, isLoading, error } = useAlerts();

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
			) : alerts.length === 0 ? (
				<EmptyState message="No alerts found." />
			) : (
				<AlertList alerts={alerts} />
			)}
		</section>
	);
}
