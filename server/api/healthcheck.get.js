export default defineEventHandler(() => {
	return {
		success: true,
		statusCode: 200,
		statusMessage: 'Server API is alive',
		data: {},
	};
});
