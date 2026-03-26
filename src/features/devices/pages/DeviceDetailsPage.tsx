import type { JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../../../components/feedback/EmptyState';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import { formatDateTime } from '../../../utils/formatDateTime';
import { useDevice } from '../hooks/useDevice';
import { formatLabel } from '../utils/formatLabel';


export default function DeviceDetailsPage(): JSX.Element {
	const { id } = useParams<{ id: string }>();

	const parsedId = id ? Number(id) : null;
	const isValidId =
		parsedId !== null && Number.isInteger(parsedId) && parsedId > 0;

	const { device, isLoading, error } = useDevice(isValidId ? parsedId : null);

	return (
		<section className="page-section" aria-labelledby="device-details-title">
			<div className="page-section__header">
				<div className="details-page__topbar">
					<div>
						<h2 id="device-details-title">Device Details</h2>
						<p className="page-section__description">
							View full device information, status, and operational metadata.
						</p>
					</div>

					<Link to="/devices" className="back-link">
						← Back to Devices
					</Link>
				</div>
			</div>

			{isLoading ? (
				<LoadingState message="Loading device details..." />
			) : error ? (
				<ErrorState message={error} />
			) : !device ? (
				<EmptyState message="Device not found." />
			) : (
				<article className="details-card">
					<div className="details-card__header">
						<div>
							<h3 className="details-card__title">{device.name}</h3>
							<p className="details-card__subtitle">
								{device.model} · {formatLabel(device.deviceType)}
							</p>
						</div>

						<span
							className={`status-badge status-badge--${device.status}`}
							aria-label={`Device status: ${formatLabel(device.status)}`}
						>
							{formatLabel(device.status)}
						</span>
					</div>

					<dl className="details-card__grid">
						<div>
							<dt>Device ID</dt>
							<dd>{device.id}</dd>
						</div>

						<div>
							<dt>Station ID</dt>
							<dd>{device.stationId}</dd>
						</div>

						<div>
							<dt>Serial Number</dt>
							<dd>{device.serialNumber}</dd>
						</div>

						<div>
							<dt>Firmware Version</dt>
							<dd>{device.firmwareVersion}</dd>
						</div>

						<div>
							<dt>IP Address</dt>
							<dd>{device.ipAddress}</dd>
						</div>

						<div>
							<dt>Signal Quality</dt>
							<dd>{device.signalQuality}%</dd>
						</div>

						<div>
							<dt>Assigned Radiosonde</dt>
							<dd>{device.assignedRadiosondeModel}</dd>
						</div>

						<div>
							<dt>Last Seen</dt>
							<dd>{formatDateTime(device.lastSeen)}</dd>
						</div>
					</dl>
				</article>
			)}
		</section>
	);
}
