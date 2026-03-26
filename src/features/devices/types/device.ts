export type DeviceStatus = 'online' | 'offline' | 'maintenance' | 'degraded';

export type DeviceType =
	| 'ground-system'
	| 'ground-check'
	| 'autosonde'
	| 'antenna-system'
	| 'ozone-module';

export type Device = {
	id: number;
	stationId: number;
	name: string;
	deviceType: DeviceType;
	model: string;
	serialNumber: string;
	firmwareVersion: string;
	ipAddress: string;
	status: DeviceStatus;
	lastSeen: string;
	signalQuality: number;
	assignedRadiosondeModel: string;
};
