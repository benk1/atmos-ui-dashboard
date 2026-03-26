import { useFetch } from '../../../hooks/useFetch';
import { getStations } from '../services/stationsService';
import type { Station } from '../types/station';

type UseStationsResult = {
	stations: Station[];
	isLoading: boolean;
	error: string | null;
};

export function useStations(): UseStationsResult {
	const { data, isLoading, error } = useFetch<Station>(
		getStations,
		'Failed to load stations. Please try again.',
	);

	return {
		stations: data,
		isLoading,
		error,
	};
}
