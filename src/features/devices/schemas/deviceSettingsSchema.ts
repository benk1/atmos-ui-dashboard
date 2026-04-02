import { z } from 'zod';

const ipv4Regex =
	/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

export const deviceSettingsSchema = z.object({
	name: z
		.string()
		.min(3, 'Device name must be at least 3 characters long.')
		.max(60, 'Device name must be 60 characters or less.'),

	ipAddress: z.string().regex(ipv4Regex, 'Please enter a valid IPv4 address.'),

	firmwareVersion: z
		.string()
		.min(3, 'Firmware version must be at least 3 characters long.')
		.max(20, 'Firmware version must be 20 characters or less.'),

	status: z.enum(['online', 'offline', 'maintenance', 'degraded'], {
		message: 'Please choose a valid device status.',
	}),

	assignedRadiosondeModel: z
		.string()
		.min(2, 'Radiosonde model is required.')
		.max(40, 'Radiosonde model must be 40 characters or less.'),

	signalThreshold: z.coerce
		.number()
		.min(0, 'Signal threshold cannot be below 0.')
		.max(100, 'Signal threshold cannot be above 100.'),

	notes: z
		.string()
		.max(300, 'Notes must be 300 characters or less.')
		.optional()
		.or(z.literal('')),
});

export type DeviceSettingsFormValues = z.infer<typeof deviceSettingsSchema>;
