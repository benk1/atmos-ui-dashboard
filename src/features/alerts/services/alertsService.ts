import apiClient from '../../../lib/axios';
import type { Alert } from '../types/alert';

export async function getAlerts(): Promise<Alert[]> {
	const response = await apiClient.get<Alert[]>('/alerts');
	return response.data;
}
