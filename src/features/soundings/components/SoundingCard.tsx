import { Link } from 'react-router-dom';
import { formatDateTime } from '../../../utils/formatDateTime';
import type { Sounding } from '../types/sounding';
import type { JSX } from 'react';

type SoundingCardProps = {
	sounding: Sounding;
};

function formatSoundingStatus(value: Sounding['status']): string {
	switch (value) {
		case 'in-progress':
			return 'In Progress';
		case 'scheduled':
			return 'Scheduled';
		case 'completed':
		default:
			return 'Completed';
	}
}

function formatNullableValue(
	value: number | null,
	suffix = '',
	fallback = '—',
): string {
	return value === null ? fallback : `${value}${suffix}`;
}

export default function SoundingCard({
	sounding,
}: SoundingCardProps): JSX.Element {
	return (
		<article className="sounding-card">
			<div className="sounding-card__header">
				<div>
					<h3 className="sounding-card__title">{sounding.soundingNumber}</h3>
					<p className="sounding-card__subtitle">
						Operator: {sounding.operator}
					</p>
				</div>

				<span
					className={`sounding-status-badge sounding-status-badge--${sounding.status}`}
					aria-label={`Sounding status: ${formatSoundingStatus(sounding.status)}`}
				>
					{formatSoundingStatus(sounding.status)}
				</span>
			</div>

			<dl className="sounding-card__details">
				<div>
					<dt>Station</dt>
					<dd>
						<Link
							to={`/stations/${sounding.stationId}`}
							className="entity-link"
						>
							Station {sounding.stationId}
						</Link>
					</dd>
				</div>

				<div>
					<dt>Device</dt>
					<dd>
						<Link to={`/devices/${sounding.deviceId}`} className="entity-link">
							Device {sounding.deviceId}
						</Link>
					</dd>
				</div>

				<div>
					<dt>Start Time</dt>
					<dd>{formatDateTime(sounding.startTime)}</dd>
				</div>

				<div>
					<dt>End Time</dt>
					<dd>
						{sounding.endTime
							? formatDateTime(sounding.endTime)
							: 'In progress'}
					</dd>
				</div>

				<div>
					<dt>Radiosonde</dt>
					<dd>{sounding.radiosondeModel}</dd>
				</div>

				<div>
					<dt>Max Altitude</dt>
					<dd>{sounding.maxAltitudeMeters} m</dd>
				</div>

				<div>
					<dt>Temperature</dt>
					<dd>{formatNullableValue(sounding.temperatureC, ' °C')}</dd>
				</div>

				<div>
					<dt>Humidity</dt>
					<dd>{formatNullableValue(sounding.humidityPercent, '%')}</dd>
				</div>

				<div>
					<dt>Pressure</dt>
					<dd>{formatNullableValue(sounding.pressureHpa, ' hPa')}</dd>
				</div>

				<div>
					<dt>Wind Speed</dt>
					<dd>{formatNullableValue(sounding.windSpeedMs, ' m/s')}</dd>
				</div>

				<div>
					<dt>Wind Direction</dt>
					<dd>{formatNullableValue(sounding.windDirectionDeg, '°')}</dd>
				</div>

				<div>
					<dt>Quality Score</dt>
					<dd>{formatNullableValue(sounding.qualityScore)}</dd>
				</div>

				<div>
					<dt>Ozone Profile</dt>
					<dd>
						{sounding.ozoneProfileAvailable ? 'Available' : 'Not available'}
					</dd>
				</div>
			</dl>
		</article>
	);
}
