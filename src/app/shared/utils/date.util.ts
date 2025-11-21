import dayjs from 'dayjs';

export function getLastDayOfPeriod(yyyymm: string): string {
	const date = dayjs(yyyymm + '01');
	const lastDay = date.endOf('month');
	return lastDay.format('DD/MM/YYYY');
}
