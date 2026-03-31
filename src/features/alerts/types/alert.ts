export type AlertSeverity = 'info' | 'warning' | 'critical';

export type Alert = {
	id: number;
	stationId: number;
	deviceId: number;
	severity: AlertSeverity;
	code: string;
	message: string;
	createdAt: string;
	resolved: boolean;
};
