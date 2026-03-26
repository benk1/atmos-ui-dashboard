import { useEffect, useState } from 'react';
import { getStationById } from '../services/stationService';
import type { Station } from '../types/station';

type UseStationResult = {
	station: Station | null;
	isLoading: boolean;
	error: string | null;
};

export function useStation(id: number | null): UseStationResult {
	const [station, setStation] = useState<Station | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (id === null) {
			setStation(null);
			setError('Invalid station id.');
			setIsLoading(false);
			return;
		}

		const fetchStation = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const data = await getStationById(id);
				setStation(data);
			} catch {
				setError('Failed to load station details.');
				setStation(null);
			} finally {
				setIsLoading(false);
			}
		};

		void fetchStation();
	}, [id]);

	return {
		station,
		isLoading,
		error,
	};
}
