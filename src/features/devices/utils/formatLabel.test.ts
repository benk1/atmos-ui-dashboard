import { formatLabel } from './formatLabel';

describe('formatLabel', () => {
	it('converts hyphenated values into spaced capitalized text', () => {
		expect(formatLabel('ground-system')).toBe('Ground System');
		expect(formatLabel('antenna-system')).toBe('Antenna System');
	});

	it('capitalizes single-word values', () => {
		expect(formatLabel('online')).toBe('Online');
		expect(formatLabel('maintenance')).toBe('Maintenance');
	});
});
