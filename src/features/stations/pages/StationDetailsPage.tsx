import { Link, useParams } from 'react-router-dom';
import EmptyState from '../../../components/feedback/EmptyState';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import { formatDateTime } from '../../../utils/formatDateTime';
import { useStation } from '../hooks/useStation';
import { formatStationStatus } from '../utils/formatStationStatus';
import type { JSX } from 'react';

export default function StationDetailsPage(): JSX.Element {
	const { id } = useParams<{ id: string }>();

	const parsedId = id ? Number(id) : null;
	const isValidId =
		parsedId !== null && Number.isInteger(parsedId) && parsedId > 0;

	const { station, isLoading, error } = useStation(isValidId ? parsedId : null);

	return (
		<section className="page-section" aria-labelledby="station-details-title">
			<div className="page-section__header">
				<div className="details-page__topbar">
					<div>
						<h2 id="station-details-title">Station Details</h2>
						<p className="page-section__description">
							View full station information, launch configuration, and
							maintenance metadata.
						</p>
					</div>

					<Link to="/stations" className="back-link">
						← Back to Stations
					</Link>
				</div>
			</div>

			{isLoading ? (
				<LoadingState message="Loading station details..." />
			) : error ? (
				<ErrorState message={error} />
			) : !station ? (
				<EmptyState message="Station not found." />
			) : (
				<article className="details-card">
					<div className="details-card__header">
						<div>
							<h3 className="details-card__title">{station.name}</h3>
							<p className="details-card__subtitle">
								{station.city}, {station.country} · {station.systemType}
							</p>
						</div>

						<span
							className={`station-status-badge station-status-badge--${station.status}`}
							aria-label={`Station status: ${formatStationStatus(station.status)}`}
						>
							{formatStationStatus(station.status)}
						</span>
					</div>

					<dl className="details-card__grid">
						<div>
							<dt>Station ID</dt>
							<dd>{station.id}</dd>
						</div>

						<div>
							<dt>Station Code</dt>
							<dd>{station.stationCode}</dd>
						</div>

						<div>
							<dt>City</dt>
							<dd>{station.city}</dd>
						</div>

						<div>
							<dt>Country</dt>
							<dd>{station.country}</dd>
						</div>

						<div>
							<dt>System Type</dt>
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
				</article>
			)}
		</section>
	);
}
