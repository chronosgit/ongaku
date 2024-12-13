export default function (code: number, message: string, data: any) {
	return {
		success: true,
		statusCode: code,
		message,
		data,
	};
}
