export default function (ts: number) {
	const hours = Math.floor(ts / 3600);
	const minutes = Math.floor((ts % 3600) / 60);
	const seconds = ts % 60;

	const padZero = (n: number) => (n < 10 ? `0${n}` : n);

	if (hours > 0) {
		return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
	} else if (minutes > 0) {
		return `${padZero(minutes)}:${padZero(seconds)}`;
	} else {
		return `${seconds} sec`;
	}
}
