import { FetchError } from 'ofetch';

export default function (err: unknown) {
	if (err instanceof FetchError) {
		throw createError(getErrorResponse(err.statusCode || 500));
	}

	throw err;
}
