import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../../utils/formatDateTime';
import type { Device } from '../types/device';
import { formatLabel } from '../utils/formatLabel';

type DeviceCardProps = {
	device: Device;
};

export default function DeviceCard({ device }: DeviceCardProps): JSX.Element {
	return (
		<article className="device-card">
			<div className="device-card__header">
				<h3 className="device-card__title">{device.name}</h3>
				<span
					className={`status-badge status-badge--${device.status}`}
					aria-label={`Device status: ${formatLabel(device.status)}`}
				>
					{formatLabel(device.status)}
				</span>
			</div>

			<dl className="device-card__details">
				<div>
					<dt>Model</dt>
					<dd>{device.model}</dd>
				</div>

				<div>
					<dt>Type</dt>
					<dd>{formatLabel(device.deviceType)}</dd>
				</div>

				<div>
					<dt>Firmware</dt>
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
					<dt>Radiosonde</dt>
					<dd>{device.assignedRadiosondeModel}</dd>
				</div>

				<div>
					<dt>Last Seen</dt>
					<dd>{formatDateTime(device.lastSeen)}</dd>
				</div>
			</dl>

			<div className="device-card__actions">
				<Link to={`/devices/${device.id}`} className="device-card__link">
					View details
				</Link>
			</div>
		</article>
	);
}
