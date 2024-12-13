export default function (code: number, message: string, data = null) {
	return {
		success: true,
		statusCode: code,
		message,
		data,
	};
}
