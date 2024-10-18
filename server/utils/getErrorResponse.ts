// Maybe make a message parameter too? For better UX and DX
export default function (errorCode: number) {
	switch (errorCode) {
		case 400:
			return {
				success: false,
				statusCode: 400,
				statusMessage: 'Bad request',
				data: {},
			};
		case 401:
			return {
				success: false,
				statusCode: 401,
				statusMessage: 'Unauthorized',
				data: {},
			};
		case 403:
			return {
				success: false,
				statusCode: 403,
				statusMessage: 'Forbidden',
				data: {},
			};
		case 404:
			return {
				success: false,
				statusCode: 404,
				statusMessage: 'Not found',
				data: {},
			};
		default:
			return {
				success: false,
				statusCode: 500,
				statusMessage: 'Internal server error',
				data: {},
			};
	}
}
