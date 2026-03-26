import apiClient from '../../../lib/axios';
import type { Station } from '../types/station';

export async function getStations(): Promise<Station[]> {
	const response = await apiClient.get<Station[]>('/stations');
	return response.data;
}
