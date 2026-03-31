import { useFetch } from '../../../hooks/useFetch';
import { getSoundings } from '../services/soundingsService';
import type { Sounding } from '../types/sounding';

type UseSoundingsResult = {
	soundings: Sounding[];
	isLoading: boolean;
	error: string | null;
};

export function useSoundings(): UseSoundingsResult {
	const { data, isLoading, error } = useFetch<Sounding>(
		getSoundings,
		'Failed to load soundings. Please try again.',
	);

	return {
		soundings: data,
		isLoading,
		error,
	};
}
