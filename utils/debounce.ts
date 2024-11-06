export default function debounce(
	f: (...args: any[]) => any | void,
	delay: number
) {
	let timeoutId: NodeJS.Timeout;

	return (...args: any[]) => {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => f(...args), delay);
	};
}
