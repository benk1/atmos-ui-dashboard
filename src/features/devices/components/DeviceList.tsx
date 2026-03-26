import type { JSX } from 'react';
import type { Device } from '../types/device';
import DeviceCard from './DeviceCard';

type DeviceListProps = {
	devices: Device[];
};

export default function DeviceList({ devices }: DeviceListProps): JSX.Element {
	return (
		<div className="device-grid">
			{devices.map((device) => (
				<DeviceCard key={device.id} device={device} />
			))}
		</div>
	);
}
