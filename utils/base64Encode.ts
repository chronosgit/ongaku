export default function (input: ArrayBuffer) {
	return btoa(String.fromCharCode(...new Uint8Array(input)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
}
