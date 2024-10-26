export default function getStringSizeInKB(s: string) {
	const encoder = new TextEncoder();

	const byteLength = encoder.encode(s).length;
	const sizeInKB = byteLength / 1024;

	return sizeInKB;
}
