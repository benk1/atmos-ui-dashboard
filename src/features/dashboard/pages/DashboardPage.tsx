import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import { formatDateTime } from '../../../utils/formatDateTime';
import { useAlerts } from '../../alerts/hooks/useAlerts';
import { useDevices } from '../../devices/hooks/useDevices';
import { useSoundings } from '../../soundings/hooks/useSoundings';
import { useStations } from '../../stations/hooks/useStations';

export default function DashboardPage(): JSX.Element {
	const {
		devices,
		isLoading: devicesLoading,
		error: devicesError,
	} = useDevices();
	const {
		stations,
		isLoading: stationsLoading,
		error: stationsError,
	} = useStations();
	const {
		soundings,
		isLoading: soundingsLoading,
		error: soundingsError,
	} = useSoundings();
	const { alerts, isLoading: alertsLoading, error: alertsError } = useAlerts();

	const isLoading =
		devicesLoading || stationsLoading || soundingsLoading || alertsLoading;

	const error = devicesError || stationsError || soundingsError || alertsError;

	if (isLoading) {
		return <LoadingState message="Loading dashboard..." />;
	}

	if (error) {
		return <ErrorState message={error} />;
	}

	const openAlertsCount = alerts.filter((alert) => !alert.resolved).length;
	const criticalAlertsCount = alerts.filter(
		(alert) => alert.severity === 'critical',
	).length;
	const operationalStationsCount = stations.filter(
		(station) => station.status === 'operational',
	).length;
	const onlineDevicesCount = devices.filter(
		(device) => device.status === 'online',
	).length;

	const recentSoundings = [...soundings]
		.sort(
			(firstSounding, secondSounding) =>
				new Date(secondSounding.startTime).getTime() -
				new Date(firstSounding.startTime).getTime(),
		)
		.slice(0, 3);

	return (
		<section className="page-section" aria-labelledby="dashboard-page-title">
			<div className="page-section__header">
				<h2 id="dashboard-page-title">Dashboard</h2>
				<p className="page-section__description">
					Overview of devices, stations, soundings, alerts, and recent activity.
				</p>
			</div>

			<div className="dashboard-grid">
				<article className="summary-card">
					<h3 className="summary-card__title">Devices</h3>
					<p className="summary-card__value">{devices.length}</p>
					<p className="summary-card__meta">{onlineDevicesCount} online</p>
				</article>

				<article className="summary-card">
					<h3 className="summary-card__title">Stations</h3>
					<p className="summary-card__value">{stations.length}</p>
					<p className="summary-card__meta">
						{operationalStationsCount} operational
					</p>
				</article>

				<article className="summary-card">
					<h3 className="summary-card__title">Soundings</h3>
					<p className="summary-card__value">{soundings.length}</p>
					<p className="summary-card__meta">Recent launches and runs</p>
				</article>

				<article className="summary-card">
					<h3 className="summary-card__title">Alerts</h3>
					<p className="summary-card__value">{alerts.length}</p>
					<p className="summary-card__meta">{openAlertsCount} open</p>
				</article>

				<article className="summary-card">
					<h3 className="summary-card__title">Critical Alerts</h3>
					<p className="summary-card__value">{criticalAlertsCount}</p>
					<p className="summary-card__meta">Requires close attention</p>
				</article>

				<article className="summary-card">
					<h3 className="summary-card__title">Quick Links</h3>
					<div className="summary-card__links">
						<Link to="/devices" className="entity-link">
							View Devices
						</Link>
						<Link to="/stations" className="entity-link">
							View Stations
						</Link>
						<Link to="/soundings" className="entity-link">
							View Soundings
						</Link>
						<Link to="/alerts" className="entity-link">
							View Alerts
						</Link>
					</div>
				</article>
			</div>

			<section className="panel" aria-labelledby="recent-soundings-title">
				<div className="dashboard-section__header">
					<h3 id="recent-soundings-title" className="dashboard-section__title">
						Recent Soundings
					</h3>
					<Link to="/soundings" className="entity-link">
						See all soundings
					</Link>
				</div>

				{recentSoundings.length === 0 ? (
					<p>No recent soundings available.</p>
				) : (
					<ul className="recent-list">
						{recentSoundings.map((sounding) => (
							<li key={sounding.id} className="recent-list__item">
								<div>
									<p className="recent-list__title">
										{sounding.soundingNumber}
									</p>
									<p className="recent-list__meta">
										{sounding.operator} · {sounding.radiosondeModel}
									</p>
								</div>

								<div className="recent-list__side">
									<p className="recent-list__time">
										{formatDateTime(sounding.startTime)}
									</p>
									<Link
										to={`/stations/${sounding.stationId}`}
										className="entity-link entity-link--inline"
									>
										Station {sounding.stationId}
									</Link>
								</div>
							</li>
						))}
					</ul>
				)}
			</section>
		</section>
	);
}
