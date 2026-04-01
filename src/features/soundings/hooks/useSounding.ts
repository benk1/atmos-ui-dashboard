import { useCallback } from 'react';
import { useFetchItem } from '../../../hooks/useFetchItem';
import { getSoundingById } from '../services/soundingsService';
import type { Sounding } from '../types/sounding';

type UseSoundingResult = {
	sounding: Sounding | null;
	isLoading: boolean;
	error: string | null;
};

export function useSounding(id: number | null): UseSoundingResult {
	const isValidId = id !== null;

	const fetchSounding = useCallback(() => {
		return getSoundingById(id as number);
	}, [id]);

	const { data, isLoading, error } = useFetchItem<Sounding>(
		fetchSounding,
		'Failed to load sounding details.',
		isValidId,
	);

	return {
		sounding: data,
		isLoading,
		error: !isValidId ? 'Invalid sounding id.' : error,
	};
}
