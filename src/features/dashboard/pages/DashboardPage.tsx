import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import { formatDateTime } from '../../../utils/formatDateTime';
import { useAlerts } from '../../alerts/hooks/useAlerts';
import { useDevices } from '../../devices/hooks/useDevices';
import { useSoundings } from '../../soundings/hooks/useSoundings';
import { useStations } from '../../stations/hooks/useStations';
import SummaryCard from '../SummaryCard';

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
				<SummaryCard
					title="Devices"
					value={devices.length}
					meta={`${onlineDevicesCount} online`}
				/>

				<SummaryCard
					title="Stations"
					value={stations.length}
					meta={`${operationalStationsCount} operational`}
				/>

				<SummaryCard
					title="Soundings"
					value={soundings.length}
					meta="Recent launches and runs"
				/>

				<SummaryCard
					title="Alerts"
					value={alerts.length}
					meta={`${openAlertsCount} open`}
				/>

				<SummaryCard
					title="Critical Alerts"
					value={criticalAlertsCount}
					meta="Requires close attention"
				/>

				<SummaryCard title="Quick Links" value="Navigate">
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
				</SummaryCard>
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
