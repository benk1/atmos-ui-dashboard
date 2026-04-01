import { Link, useParams } from 'react-router-dom';
import EmptyState from '../../../components/feedback/EmptyState';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import { formatDateTime } from '../../../utils/formatDateTime';
import { useSounding } from '../hooks/useSounding';
import type { SoundingStatus } from '../types/sounding';
import type { JSX } from 'react';

function formatSoundingStatus(status: SoundingStatus): string {
	switch (status) {
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

export default function SoundingDetailsPage(): JSX.Element {
	const { id } = useParams<{ id: string }>();

	const parsedId = id ? Number(id) : null;
	const isValidId =
		parsedId !== null && Number.isInteger(parsedId) && parsedId > 0;

	const { sounding, isLoading, error } = useSounding(
		isValidId ? parsedId : null,
	);

	return (
		<section className="page-section" aria-labelledby="sounding-details-title">
			<div className="page-section__header">
				<div className="details-page__topbar">
					<div>
						<h2 id="sounding-details-title">Sounding Details</h2>
						<p className="page-section__description">
							View full sounding information, timing, atmospheric values, and
							related entities.
						</p>
					</div>

					<Link to="/soundings" className="back-link">
						← Back to Soundings
					</Link>
				</div>
			</div>

			{isLoading ? (
				<LoadingState message="Loading sounding details..." />
			) : error ? (
				<ErrorState message={error} />
			) : !sounding ? (
				<EmptyState message="Sounding not found." />
			) : (
				<article className="details-card">
					<div className="details-card__header">
						<div>
							<h3 className="details-card__title">{sounding.soundingNumber}</h3>
							<p className="details-card__subtitle">
								{sounding.operator} · {sounding.radiosondeModel}
							</p>
						</div>

						<span
							className={`sounding-status-badge sounding-status-badge--${sounding.status}`}
							aria-label={`Sounding status: ${formatSoundingStatus(sounding.status)}`}
						>
							{formatSoundingStatus(sounding.status)}
						</span>
					</div>

					<dl className="details-card__grid">
						<div>
							<dt>Sounding ID</dt>
							<dd>{sounding.id}</dd>
						</div>

						<div>
							<dt>Status</dt>
							<dd>{formatSoundingStatus(sounding.status)}</dd>
						</div>

						<div>
							<dt>Station</dt>
							<dd>
								<Link
									to={`/stations/${sounding.stationId}`}
									className="entity-link entity-link--inline"
								>
									Station {sounding.stationId}
								</Link>
							</dd>
						</div>

						<div>
							<dt>Device</dt>
							<dd>
								<Link
									to={`/devices/${sounding.deviceId}`}
									className="entity-link entity-link--inline"
								>
									Device {sounding.deviceId}
								</Link>
							</dd>
						</div>

						<div>
							<dt>Operator</dt>
							<dd>{sounding.operator}</dd>
						</div>

						<div>
							<dt>Radiosonde Model</dt>
							<dd>{sounding.radiosondeModel}</dd>
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
			)}
		</section>
	);
}
