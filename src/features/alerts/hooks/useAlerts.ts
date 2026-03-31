import { useFetch } from '../../../hooks/useFetch';
import { getAlerts } from '../services/alertsService';
import type { Alert } from '../types/alert';

type UseAlertsResult = {
	alerts: Alert[];
	isLoading: boolean;
	error: string | null;
};

export function useAlerts(): UseAlertsResult {
	const { data, isLoading, error } = useFetch<Alert>(
		getAlerts,
		'Failed to load alerts. Please try again.',
	);

	return {
		alerts: data,
		isLoading,
		error,
	};
}
