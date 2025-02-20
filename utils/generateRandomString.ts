export default function (length = 128) {
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	const values = crypto.getRandomValues(new Uint8Array(length));

	return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}
