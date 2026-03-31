import type { JSX } from 'react';
import { formatDateTime } from '../../../utils/formatDateTime';
import type { Alert } from '../types/alert';

type AlertCardProps = {
	alert: Alert;
};

function formatSeverityLabel(value: Alert['severity']): string {
	switch (value) {
		case 'critical':
			return 'Critical';
		case 'warning':
			return 'Warning';
		case 'info':
		default:
			return 'Info';
	}
}

export default function AlertCard({ alert }: AlertCardProps): JSX.Element {
	return (
		<article className="alert-card">
			<div className="alert-card__header">
				<div>
					<h3 className="alert-card__title">{alert.code}</h3>
					<p className="alert-card__subtitle">
						Station {alert.stationId} · Device {alert.deviceId}
					</p>
				</div>

				<div className="alert-card__badges">
					<span
						className={`alert-severity-badge alert-severity-badge--${alert.severity}`}
						aria-label={`Alert severity: ${formatSeverityLabel(alert.severity)}`}
					>
						{formatSeverityLabel(alert.severity)}
					</span>

					<span
						className={`alert-resolution-badge ${
							alert.resolved
								? 'alert-resolution-badge--resolved'
								: 'alert-resolution-badge--open'
						}`}
					>
						{alert.resolved ? 'Resolved' : 'Open'}
					</span>
				</div>
			</div>

			<div className="alert-card__body">
				<p className="alert-card__message">{alert.message}</p>

				<dl className="alert-card__details">
					<div>
						<dt>Created</dt>
						<dd>{formatDateTime(alert.createdAt)}</dd>
					</div>

					<div>
						<dt>Severity</dt>
						<dd>{formatSeverityLabel(alert.severity)}</dd>
					</div>
				</dl>
			</div>
		</article>
	);
}
