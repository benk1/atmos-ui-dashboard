export type SoundingStatus = 'completed' | 'in-progress' | 'scheduled';

export type Sounding = {
	id: number;
	stationId: number;
	deviceId: number;
	soundingNumber: string;
	startTime: string;
	endTime: string | null;
	status: SoundingStatus;
	operator: string;
	radiosondeModel: string;
	maxAltitudeMeters: number;
	temperatureC: number | null;
	humidityPercent: number | null;
	pressureHpa: number | null;
	windSpeedMs: number | null;
	windDirectionDeg: number | null;
	ozoneProfileAvailable: boolean;
	qualityScore: number | null;
};
