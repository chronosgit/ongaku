export default async function (plain) {
	const encoder = new TextEncoder();

	const data = encoder.encode(plain);

	return window.crypto.subtle.digest('SHA-256', data);
}
