import apiClient from '../../../lib/axios';
import type { Sounding } from '../types/sounding';

export async function getSoundings(): Promise<Sounding[]> {
	const response = await apiClient.get<Sounding[]>('/soundings');
	return response.data;
}
