import type { JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../../../components/feedback/EmptyState';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import { formatDateTime } from '../../../utils/formatDateTime';
import { useAlert } from '../hooks/useAlert';
import type { AlertSeverity } from '../types/alert';

function formatSeverityLabel(severity: AlertSeverity): string {
	switch (severity) {
		case 'critical':
			return 'Critical';
		case 'warning':
			return 'Warning';
		case 'info':
		default:
			return 'Info';
	}
}

export default function AlertDetailsPage(): JSX.Element {
	const { id } = useParams<{ id: string }>();

	const parsedId = id ? Number(id) : null;
	const isValidId =
		parsedId !== null && Number.isInteger(parsedId) && parsedId > 0;

	const { alert, isLoading, error } = useAlert(isValidId ? parsedId : null);

	return (
		<section className="page-section" aria-labelledby="alert-details-title">
			<div className="page-section__header">
				<div className="details-page__topbar">
					<div>
						<h2 id="alert-details-title">Alert Details</h2>
						<p className="page-section__description">
							View full alert information, severity, resolution state, and
							related entities.
						</p>
					</div>

					<Link to="/alerts" className="back-link">
						← Back to Alerts
					</Link>
				</div>
			</div>

			{isLoading ? (
				<LoadingState message="Loading alert details..." />
			) : error ? (
				<ErrorState message={error} />
			) : !alert ? (
				<EmptyState message="Alert not found." />
			) : (
				<article className="details-card">
					<div className="details-card__header">
						<div>
							<h3 className="details-card__title">{alert.code}</h3>
							<p className="details-card__subtitle">{alert.message}</p>
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

					<dl className="details-card__grid">
						<div>
							<dt>Alert ID</dt>
							<dd>{alert.id}</dd>
						</div>

						<div>
							<dt>Severity</dt>
							<dd>{formatSeverityLabel(alert.severity)}</dd>
						</div>

						<div>
							<dt>Created At</dt>
							<dd>{formatDateTime(alert.createdAt)}</dd>
						</div>

						<div>
							<dt>Resolution</dt>
							<dd>{alert.resolved ? 'Resolved' : 'Open'}</dd>
						</div>

						<div>
							<dt>Station</dt>
							<dd>
								<Link
									to={`/stations/${alert.stationId}`}
									className="entity-link entity-link--inline"
								>
									Station {alert.stationId}
								</Link>
							</dd>
						</div>

						<div>
							<dt>Device</dt>
							<dd>
								<Link
									to={`/devices/${alert.deviceId}`}
									className="entity-link entity-link--inline"
								>
									Device {alert.deviceId}
								</Link>
							</dd>
						</div>
					</dl>
				</article>
			)}
		</section>
	);
}
