export default function (
	ms: number,
	dayName = 'day',
	hourName = 'hr',
	minuteName = 'min',
	secName = 'sec'
) {
	const d = dayName.toLowerCase() + '.';
	const h = hourName.toLowerCase() + '.';
	const m = minuteName.toLowerCase() + '.';
	const s = secName.toLowerCase() + '.';

	const msInSecond = 1000;
	const msInMinute = 60 * msInSecond;
	const msInHour = 60 * msInMinute;
	const msInDay = 24 * msInHour;

	const days = Math.floor(ms / msInDay);
	ms %= msInDay;

	const hours = Math.floor(ms / msInHour);
	ms %= msInHour;

	const minutes = Math.floor(ms / msInMinute);
	ms %= msInMinute;

	const seconds = Math.floor(ms / msInSecond);

	const parts: string[] = [];

	if (days > 0) parts.push(`${days} ${d}`);
	if (hours > 0) parts.push(`${hours} ${h}`);
	if (minutes > 0) parts.push(`${minutes} ${m}`);
	if (seconds > 0 || parts.length === 0) {
		parts.push(`${seconds} ${s}`);
	}

	return parts.join(' ');
}
