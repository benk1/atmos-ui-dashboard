import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../../utils/formatDateTime';
import type { Station } from '../types/station';
import { formatStationStatus } from '../utils/formatStationStatus';

type StationCardProps = {
	station: Station;
};

export default function StationCard({
	station,
}: StationCardProps): JSX.Element {
	return (
		<article className="station-card">
			<div className="station-card__header">
				<div>
					<h3 className="station-card__title">{station.name}</h3>
					<p className="station-card__subtitle">
						{station.city}, {station.country}
					</p>
				</div>

				<span
					className={`station-status-badge station-status-badge--${station.status}`}
					aria-label={`Station status: ${formatStationStatus(station.status)}`}
				>
					{formatStationStatus(station.status)}
				</span>
			</div>

			<dl className="station-card__details">
				<div>
					<dt>Code</dt>
					<dd>{station.stationCode}</dd>
				</div>

				<div>
					<dt>System</dt>
					<dd>{station.systemType}</dd>
				</div>

				<div>
					<dt>Launch Mode</dt>
					<dd>{formatStationStatus(station.launchMode)}</dd>
				</div>

				<div>
					<dt>Altitude</dt>
					<dd>{station.altitudeMeters} m</dd>
				</div>

				<div>
					<dt>Coordinates</dt>
					<dd>
						{station.latitude}, {station.longitude}
					</dd>
				</div>

				<div>
					<dt>Last Maintenance</dt>
					<dd>{formatDateTime(station.lastMaintenance)}</dd>
				</div>
			</dl>

			<div className="device-card__actions">
				<Link to={`/stations/${station.id}`} className="device-card__link">
					View details
				</Link>
			</div>
		</article>
	);
}
