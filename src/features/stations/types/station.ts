export type StationStatus = 'operational' | 'maintenance' | 'degraded';

export type LaunchMode = 'manual' | 'automatic';

export type SystemType = 'MW41' | 'MW51' | 'AS41';

export type Station = {
	id: number;
	name: string;
	country: string;
	city: string;
	stationCode: string;
	altitudeMeters: number;
	latitude: number;
	longitude: number;
	status: StationStatus;
	launchMode: LaunchMode;
	systemType: SystemType;
	lastMaintenance: string;
};
