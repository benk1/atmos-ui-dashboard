import { useCallback } from 'react';
import { useFetchItem } from '../../../hooks/useFetchItem';
import { getAlertById } from '../services/alertsService';
import type { Alert } from '../types/alert';

type UseAlertResult = {
	alert: Alert | null;
	isLoading: boolean;
	error: string | null;
};

export function useAlert(id: number | null): UseAlertResult {
	const isValidId = id !== null;

	const fetchAlert = useCallback(() => {
		return getAlertById(id as number);
	}, [id]);

	const { data, isLoading, error } = useFetchItem<Alert>(
		fetchAlert,
		'Failed to load alert details.',
		isValidId,
	);

	return {
		alert: data,
		isLoading,
		error: !isValidId ? 'Invalid alert id.' : error,
	};
}
