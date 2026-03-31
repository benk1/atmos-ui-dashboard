import SoundingCard from './SoundingCard';
import type { Sounding } from '../types/sounding';
import type {JSX} from 'react';

type SoundingListProps = {
	soundings: Sounding[];
};

export default function SoundingList({
	soundings,
}: SoundingListProps): JSX.Element {
	return (
		<div className="sounding-grid">
			{soundings.map((sounding) => (
				<SoundingCard key={sounding.id} sounding={sounding} />
			))}
		</div>
	);
}
