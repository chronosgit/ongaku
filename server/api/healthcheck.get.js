export default defineEventHandler(() => {
	return {
		statusCode: 200,
		success: true,
		message: 'API is running successfully.',
		data: {},
	};
});
