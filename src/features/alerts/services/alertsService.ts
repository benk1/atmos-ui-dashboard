import apiClient from '../../../lib/axios';
import type { Alert } from '../types/alert';

export async function getAlerts(): Promise<Alert[]> {
	const response = await apiClient.get<Alert[]>('/alerts');
	return response.data;
}

export async function getAlertById(id: number): Promise<Alert> {
	const response = await apiClient.get<Alert>(`/alerts/${id}`);
	return response.data;
}
