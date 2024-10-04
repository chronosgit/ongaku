export default function (code, message, data) {
	return {
		success: true,
		statusCode: code,
		statusMessage: message,
		data: data || {},
	};
}
