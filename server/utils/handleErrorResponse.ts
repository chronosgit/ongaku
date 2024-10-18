import { FetchError } from 'ofetch';

export default function (err: unknown) {
	if (err instanceof FetchError) throw createError(getErrorOptions(err));

	throw err;
}
