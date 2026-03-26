import apiClient from '../../../lib/axios';
import type { Device } from '../types/device';

export async function getDevices(): Promise<Device[]> {
	const response = await apiClient.get<Device[]>('/devices');
	return response.data;
}

export async function getDeviceById(id: number): Promise<Device> {
	const response = await apiClient.get<Device>(`/devices/${id}`);
	return response.data;
}
