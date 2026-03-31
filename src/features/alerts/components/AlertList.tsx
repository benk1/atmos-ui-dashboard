import type { JSX } from 'react';
import type { Alert } from '../types/alert';
import AlertCard from './AlertCard';

type AlertListProps = {
	alerts: Alert[];
};

export default function AlertList({ alerts }: AlertListProps): JSX.Element {
	return (
		<div className="alert-grid">
			{alerts.map((alert) => (
				<AlertCard key={alert.id} alert={alert} />
			))}
		</div>
	);
}
