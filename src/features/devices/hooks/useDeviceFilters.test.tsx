import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Device } from '../types/device';
import { useDeviceFilters } from './useDeficeFilters';
import type { JSX } from 'react';

const mockDevices: Device[] = [
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
		name: 'Autosonde Operations Unit',
		deviceType: 'autosonde',
		model: 'AS41',
		serialNumber: 'AS41-FI-101',
		firmwareVersion: '3.3.2',
		ipAddress: '10.20.2.21',
		status: 'maintenance',
		lastSeen: '2026-03-16T08:31:00Z',
		signalQuality: 99,
		assignedRadiosondeModel: 'RS41',
	},
	{
		id: 3,
		stationId: 3,
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
];

function TestDeviceFilters(): JSX.Element {
	const {
		searchTerm,
		selectedStatuses,
		sortOption,
		setSearchTerm,
		toggleStatus,
		setSortOption,
		filteredDevices,
	} = useDeviceFilters(mockDevices);

	return (
		<div>
			<label htmlFor="search">Search</label>
			<input
				id="search"
				value={searchTerm}
				onChange={(event) => setSearchTerm(event.target.value)}
			/>

			<label>
				<input
					type="checkbox"
					checked={selectedStatuses.includes('online')}
					onChange={() => toggleStatus('online')}
				/>
				Online
			</label>

			<label>
				<input
					type="checkbox"
					checked={selectedStatuses.includes('maintenance')}
					onChange={() => toggleStatus('maintenance')}
				/>
				Maintenance
			</label>

			<label htmlFor="sort">Sort</label>
			<select
				id="sort"
				value={sortOption}
				onChange={(event) =>
					setSortOption(
						event.target.value as
							| 'name-asc'
							| 'signal-desc'
							| 'signal-asc'
							| 'last-seen-desc',
					)
				}
			>
				<option value="name-asc">Name</option>
				<option value="signal-desc">Signal desc</option>
				<option value="signal-asc">Signal asc</option>
				<option value="last-seen-desc">Last seen</option>
			</select>

			<p>Count: {filteredDevices.length}</p>

			<ul>
				{filteredDevices.map((device) => (
					<li key={device.id}>{device.name}</li>
				))}
			</ul>
		</div>
	);
}

describe('useDeviceFilters', () => {
	it('shows all devices by default', () => {
		render(<TestDeviceFilters />);

		expect(screen.getByText('Count: 3')).toBeInTheDocument();
		expect(screen.getByText('MW41 Processing Console')).toBeInTheDocument();
		expect(screen.getByText('Autosonde Operations Unit')).toBeInTheDocument();
		expect(screen.getByText('Backup MW41 Console')).toBeInTheDocument();
	});

	it('filters devices by search term', async () => {
		const user = userEvent.setup();
		render(<TestDeviceFilters />);

		await user.type(screen.getByLabelText('Search'), 'autosonde');

		expect(screen.getByText('Count: 1')).toBeInTheDocument();
		expect(screen.getByText('Autosonde Operations Unit')).toBeInTheDocument();
		expect(
			screen.queryByText('MW41 Processing Console'),
		).not.toBeInTheDocument();
	});

	it('filters devices by selected status', async () => {
		const user = userEvent.setup();
		render(<TestDeviceFilters />);

		await user.click(screen.getByLabelText('Online'));

		expect(screen.getByText('Count: 1')).toBeInTheDocument();
		expect(screen.getByText('MW41 Processing Console')).toBeInTheDocument();
		expect(
			screen.queryByText('Autosonde Operations Unit'),
		).not.toBeInTheDocument();
	});

	it('combines search and status filters', async () => {
		const user = userEvent.setup();
		render(<TestDeviceFilters />);

		await user.type(screen.getByLabelText('Search'), 'mw41');
		await user.click(screen.getByLabelText('Online'));

		expect(screen.getByText('Count: 1')).toBeInTheDocument();
		expect(screen.getByText('MW41 Processing Console')).toBeInTheDocument();
		expect(screen.queryByText('Backup MW41 Console')).not.toBeInTheDocument();
	});
});
