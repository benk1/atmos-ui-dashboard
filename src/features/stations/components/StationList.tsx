import type { JSX } from 'react';
import type { Station } from '../types/station';
import StationCard from './StationCard';

type StationListProps = {
	stations: Station[];
};

export default function StationList({
	stations,
}: StationListProps): JSX.Element {
	return (
		<div className="station-grid">
			{stations.map((station) => (
				<StationCard key={station.id} station={station} />
			))}
		</div>
	);
}
