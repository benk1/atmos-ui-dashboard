import { Link, useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../../../components/feedback/EmptyState';
import ErrorState from '../../../components/feedback/ErrorState';
import LoadingState from '../../../components/feedback/LoadingState';
import DeviceSettingsForm from '../components/DeviceSettingsForm';
import { useDevice } from '../hooks/useDevice';
import type { DeviceSettingsFormValues } from '../schemas/deviceSettingsSchema';
import type { JSX } from 'react';

function mapDeviceToFormValues(
	device: NonNullable<ReturnType<typeof useDevice>['device']>,
): DeviceSettingsFormValues {
	return {
		name: device.name,
		ipAddress: device.ipAddress,
		firmwareVersion: device.firmwareVersion,
		status: device.status,
		assignedRadiosondeModel: device.assignedRadiosondeModel,
		signalThreshold: device.signalQuality,
		notes: '',
	};
}

export default function DeviceSettingsPage(): JSX.Element {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const parsedId = id ? Number(id) : null;
	const isValidId =
		parsedId !== null && Number.isInteger(parsedId) && parsedId > 0;

	const { device, isLoading, error } = useDevice(isValidId ? parsedId : null);

	if (isLoading) {
		return <LoadingState message="Loading device settings..." />;
	}

	if (error) {
		return <ErrorState message={error} />;
	}

	if (!device) {
		return <EmptyState message="Device not found." />;
	}

	const initialValues = mapDeviceToFormValues(device);

	return (
		<section className="page-section" aria-labelledby="device-settings-title">
			<div className="page-section__header">
				<div className="details-page__topbar">
					<div>
						<h2 id="device-settings-title">Edit Device Settings</h2>
						<p className="page-section__description">
							Update configuration for <strong>{device.name}</strong>.
						</p>
					</div>

					<div className="card-actions">
						<Link to={`/devices/${device.id}`} className="back-link">
							← Back to Device Details
						</Link>
					</div>
				</div>
			</div>

			<DeviceSettingsForm
				initialValues={initialValues}
				onCancel={() => navigate(`/devices/${device.id}`)}
			/>
		</section>
	);
}

