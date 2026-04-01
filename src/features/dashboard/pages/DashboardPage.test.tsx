import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import * as devicesHook from '../../devices/hooks/useDevices';
import * as stationsHook from '../../stations/hooks/useStations';
import * as soundingsHook from '../../soundings/hooks/useSoundings';
import * as alertsHook from '../../alerts/hooks/useAlerts';

vi.mock('../../devices/hooks/useDevices', () => ({
	useDevices: vi.fn(),
}));

vi.mock('../../stations/hooks/useStations', () => ({
	useStations: vi.fn(),
}));

vi.mock('../../soundings/hooks/useSoundings', () => ({
	useSoundings: vi.fn(),
}));

vi.mock('../../alerts/hooks/useAlerts', () => ({
	useAlerts: vi.fn(),
}));

const mockedUseDevices = vi.mocked(devicesHook.useDevices);
const mockedUseStations = vi.mocked(stationsHook.useStations);
const mockedUseSoundings = vi.mocked(soundingsHook.useSoundings);
const mockedUseAlerts = vi.mocked(alertsHook.useAlerts);

function renderDashboard(): void {
	render(
		<MemoryRouter>
			<DashboardPage />
		</MemoryRouter>,
	);
}

describe('DashboardPage', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders loading state when one or more feature hooks are loading', () => {
		mockedUseDevices.mockReturnValue({
			devices: [],
			isLoading: true,
			error: null,
		});

		mockedUseStations.mockReturnValue({
			stations: [],
			isLoading: false,
			error: null,
		});

		mockedUseSoundings.mockReturnValue({
			soundings: [],
			isLoading: false,
			error: null,
		});

		mockedUseAlerts.mockReturnValue({
			alerts: [],
			isLoading: false,
			error: null,
		});

		renderDashboard();

		expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
	});

	it('renders error state when one of the feature hooks returns an error', () => {
		mockedUseDevices.mockReturnValue({
			devices: [],
			isLoading: false,
			error: 'Failed to load devices.',
		});

		mockedUseStations.mockReturnValue({
			stations: [],
			isLoading: false,
			error: null,
		});

		mockedUseSoundings.mockReturnValue({
			soundings: [],
			isLoading: false,
			error: null,
		});

		mockedUseAlerts.mockReturnValue({
			alerts: [],
			isLoading: false,
			error: null,
		});

		renderDashboard();

		expect(screen.getByText('Failed to load devices.')).toBeInTheDocument();
	});

	it('renders summary metrics and recent soundings when all data loads successfully', () => {
		mockedUseDevices.mockReturnValue({
			devices: [
				{
					id: 1,
					stationId: 1,
					name: 'MW41 Processing Console',
					deviceType: 'ground-system',
					model: 'MW41',
					serialNumber: 'MW41-FI-001',
					firmwareVersion: '4.2.1',
					ipAddress: '10.20.1.11',
					status: 'online',
					lastSeen: '2026-03-16T08:30:00Z',
					signalQuality: 98,
					assignedRadiosondeModel: 'RS41-SGP',
				},
				{
					id: 2,
					stationId: 2,
					name: 'Backup MW41 Console',
					deviceType: 'ground-system',
					model: 'MW41',
					serialNumber: 'MW41-FI-302',
					firmwareVersion: '4.1.9',
					ipAddress: '10.20.4.42',
					status: 'offline',
					lastSeen: '2026-03-14T22:45:00Z',
					signalQuality: 0,
					assignedRadiosondeModel: 'RS41 E-model',
				},
			],
			isLoading: false,
			error: null,
		});

		mockedUseStations.mockReturnValue({
			stations: [
				{
					id: 1,
					name: 'Helsinki Upper-Air Station',
					country: 'Finland',
					city: 'Helsinki',
					stationCode: 'FIHEL01',
					altitudeMeters: 18,
					latitude: 60.1699,
					longitude: 24.9384,
					status: 'operational',
					launchMode: 'manual',
					systemType: 'MW41',
					lastMaintenance: '2026-03-01T08:00:00Z',
				},
				{
					id: 2,
					name: 'Tampere Research Sounding Lab',
					country: 'Finland',
					city: 'Tampere',
					stationCode: 'FITRE03',
					altitudeMeters: 120,
					latitude: 61.4978,
					longitude: 23.761,
					status: 'maintenance',
					launchMode: 'manual',
					systemType: 'MW51',
					lastMaintenance: '2026-03-10T10:45:00Z',
				},
			],
			isLoading: false,
			error: null,
		});

		mockedUseSoundings.mockReturnValue({
			soundings: [
				{
					id: 1,
					stationId: 1,
					deviceId: 1,
					soundingNumber: 'HEL-2026-0316-01',
					startTime: '2026-03-16T06:00:00Z',
					endTime: '2026-03-16T07:42:00Z',
					status: 'completed',
					operator: 'Bernard Kakengi',
					radiosondeModel: 'RS41-SGP',
					maxAltitudeMeters: 31250,
					temperatureC: -54.2,
					humidityPercent: 18,
					pressureHpa: 9.8,
					windSpeedMs: 31.4,
					windDirectionDeg: 245,
					ozoneProfileAvailable: false,
					qualityScore: 98,
				},
				{
					id: 2,
					stationId: 2,
					deviceId: 2,
					soundingNumber: 'TRE-2026-0315-02',
					startTime: '2026-03-15T12:00:00Z',
					endTime: '2026-03-15T13:47:00Z',
					status: 'completed',
					operator: 'Research Team',
					radiosondeModel: 'RS41-SGP',
					maxAltitudeMeters: 32690,
					temperatureC: -56.1,
					humidityPercent: 14,
					pressureHpa: 8.9,
					windSpeedMs: 35.7,
					windDirectionDeg: 238,
					ozoneProfileAvailable: true,
					qualityScore: 94,
				},
			],
			isLoading: false,
			error: null,
		});

		mockedUseAlerts.mockReturnValue({
			alerts: [
				{
					id: 1,
					stationId: 1,
					deviceId: 1,
					severity: 'warning',
					code: 'SIG-LOW',
					message: 'Signal quality dropped below recommended threshold.',
					createdAt: '2026-03-16T08:05:00Z',
					resolved: false,
				},
				{
					id: 2,
					stationId: 2,
					deviceId: 2,
					severity: 'critical',
					code: 'CONN-LOST',
					message: 'Backup console is offline.',
					createdAt: '2026-03-15T22:50:00Z',
					resolved: false,
				},
			],
			isLoading: false,
			error: null,
		});

		renderDashboard();

		expect(screen.getByText('Dashboard')).toBeInTheDocument();

		expect(screen.getByText('Devices')).toBeInTheDocument();
		expect(screen.getByText('1 online')).toBeInTheDocument();

		expect(screen.getByText('Stations')).toBeInTheDocument();
		expect(screen.getByText('1 operational')).toBeInTheDocument();

		expect(screen.getByText('Alerts')).toBeInTheDocument();
		expect(screen.getByText('2 open')).toBeInTheDocument();

		expect(screen.getByText('Critical Alerts')).toBeInTheDocument();
		expect(screen.getByText('Requires close attention')).toBeInTheDocument();

		expect(screen.getByText('Recent Soundings')).toBeInTheDocument();
		expect(screen.getByText('HEL-2026-0316-01')).toBeInTheDocument();
		expect(screen.getByText('TRE-2026-0315-02')).toBeInTheDocument();

		expect(
			screen.getByRole('link', { name: 'View Devices' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'View Stations' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'View Soundings' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'View Alerts' }),
		).toBeInTheDocument();
	});
});
