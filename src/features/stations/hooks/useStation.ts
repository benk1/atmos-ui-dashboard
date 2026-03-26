import { useCallback } from 'react';
import { useFetchItem } from '../../../hooks/useFetchItem';
import { getStationById } from '../services/stationsService';
import type { Station } from '../types/station';

type UseStationResult = {
	station: Station | null;
	isLoading: boolean;
	error: string | null;
};

export function useStation(id: number | null): UseStationResult {
	const isValidId = id !== null;

	const fetchStation = useCallback(() => {
		return getStationById(id as number);
	}, [id]);

	const { data, isLoading, error } = useFetchItem<Station>(
		fetchStation,
		'Failed to load station details.',
		isValidId,
	);

	return {
		station: data,
		isLoading,
		error: !isValidId ? 'Invalid station id.' : error,
	};
}
