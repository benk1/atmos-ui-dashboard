import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import {
	deviceSettingsSchema,
	type DeviceSettingsFormValues,
} from '../schemas/deviceSettingsSchema';

type DeviceSettingsFormProps = {
	initialValues: DeviceSettingsFormValues;
	onCancel: () => void;
};

export default function DeviceSettingsForm({
	initialValues,
	onCancel,
}: DeviceSettingsFormProps): JSX.Element {
	const [submittedValues, setSubmittedValues] =
		useState<DeviceSettingsFormValues | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<DeviceSettingsFormValues>({
		resolver: zodResolver(deviceSettingsSchema) as any,
		defaultValues: initialValues,
		mode: 'onBlur',
	});

	const notesHintId = useId();

	const onSubmit = async (values: DeviceSettingsFormValues) => {
		await new Promise((resolve) => setTimeout(resolve, 600));
		setSubmittedValues(values);
	};

	return (
		<div className="form-layout">
			<form
				className="settings-form"
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<div className="form-grid">
					<div className="form-group">
						<label htmlFor="device-name" className="form-label">
							Device Name
						</label>
						<input
							id="device-name"
							type="text"
							className="form-input"
							aria-invalid={errors.name ? 'true' : 'false'}
							aria-describedby={errors.name ? 'device-name-error' : undefined}
							{...register('name')}
						/>
						{errors.name ? (
							<p id="device-name-error" className="form-error" role="alert">
								{errors.name.message}
							</p>
						) : null}
					</div>

					<div className="form-group">
						<label htmlFor="device-ip" className="form-label">
							IP Address
						</label>
						<input
							id="device-ip"
							type="text"
							className="form-input"
							inputMode="numeric"
							aria-invalid={errors.ipAddress ? 'true' : 'false'}
							aria-describedby={
								errors.ipAddress ? 'device-ip-error' : undefined
							}
							{...register('ipAddress')}
						/>
						{errors.ipAddress ? (
							<p id="device-ip-error" className="form-error" role="alert">
								{errors.ipAddress.message}
							</p>
						) : null}
					</div>

					<div className="form-group">
						<label htmlFor="device-firmware" className="form-label">
							Firmware Version
						</label>
						<input
							id="device-firmware"
							type="text"
							className="form-input"
							aria-invalid={errors.firmwareVersion ? 'true' : 'false'}
							aria-describedby={
								errors.firmwareVersion ? 'device-firmware-error' : undefined
							}
							{...register('firmwareVersion')}
						/>
						{errors.firmwareVersion ? (
							<p id="device-firmware-error" className="form-error" role="alert">
								{errors.firmwareVersion.message}
							</p>
						) : null}
					</div>

					<div className="form-group">
						<label htmlFor="device-status" className="form-label">
							Status
						</label>
						<select
							id="device-status"
							className="form-input"
							aria-invalid={errors.status ? 'true' : 'false'}
							aria-describedby={
								errors.status ? 'device-status-error' : undefined
							}
							{...register('status')}
						>
							<option value="online">Online</option>
							<option value="offline">Offline</option>
							<option value="maintenance">Maintenance</option>
							<option value="degraded">Degraded</option>
						</select>
						{errors.status ? (
							<p id="device-status-error" className="form-error" role="alert">
								{errors.status.message}
							</p>
						) : null}
					</div>

					<div className="form-group">
						<label htmlFor="device-radiosonde" className="form-label">
							Assigned Radiosonde Model
						</label>
						<input
							id="device-radiosonde"
							type="text"
							className="form-input"
							aria-invalid={errors.assignedRadiosondeModel ? 'true' : 'false'}
							aria-describedby={
								errors.assignedRadiosondeModel
									? 'device-radiosonde-error'
									: undefined
							}
							{...register('assignedRadiosondeModel')}
						/>
						{errors.assignedRadiosondeModel ? (
							<p
								id="device-radiosonde-error"
								className="form-error"
								role="alert"
							>
								{errors.assignedRadiosondeModel.message}
							</p>
						) : null}
					</div>

					<div className="form-group">
						<label htmlFor="device-threshold" className="form-label">
							Signal Threshold
						</label>
						<input
							id="device-threshold"
							type="number"
							className="form-input"
							min={0}
							max={100}
							aria-invalid={errors.signalThreshold ? 'true' : 'false'}
							aria-describedby={
								errors.signalThreshold ? 'device-threshold-error' : undefined
							}
							{...register('signalThreshold')}
						/>
						{errors.signalThreshold ? (
							<p
								id="device-threshold-error"
								className="form-error"
								role="alert"
							>
								{errors.signalThreshold.message}
							</p>
						) : null}
					</div>

					<div className="form-group form-group--full">
						<label htmlFor="device-notes" className="form-label">
							Notes
						</label>
						<textarea
							id="device-notes"
							className="form-input form-textarea"
							rows={5}
							aria-invalid={errors.notes ? 'true' : 'false'}
							aria-describedby={
								errors.notes ? 'device-notes-error' : notesHintId
							}
							{...register('notes')}
						/>
						<p id={notesHintId} className="form-hint">
							Optional operational notes for this device.
						</p>
						{errors.notes ? (
							<p id="device-notes-error" className="form-error" role="alert">
								{errors.notes.message}
							</p>
						) : null}
					</div>
				</div>

				<div className="form-actions">
					<button
						type="submit"
						className="details-link"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Saving...' : 'Save Settings'}
					</button>

					<button
						type="button"
						className="details-link"
						onClick={() => reset(initialValues)}
						disabled={!isDirty || isSubmitting}
					>
						Reset
					</button>

					<button
						type="button"
						className="details-link"
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Cancel
					</button>
				</div>
			</form>

			{submittedValues ? (
				<section className="panel" aria-labelledby="submitted-values-title">
					<h3 id="submitted-values-title" className="dashboard-section__title">
						Submitted Values Preview
					</h3>
					<pre className="form-preview">
						{JSON.stringify(submittedValues, null, 2)}
					</pre>
				</section>
			) : null}
		</div>
	);
}
