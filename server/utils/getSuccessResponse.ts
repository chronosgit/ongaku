export default function (code: number, message: string, data: Object = {}) {
	return {
		success: true,
		statusCode: code,
		message: message,
		data,
	};
}
