import { FetchError } from 'ofetch';

export default function (err: unknown) {
	console.error(err);

	if (!err) {
		throw createError(getErrorResponse(500));
	}

	if (err instanceof FetchError) {
		throw createError(getErrorResponse(err.statusCode || 500));
	}

	throw err;
}
