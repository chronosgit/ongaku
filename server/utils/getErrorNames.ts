export default function () {
	enum ErrorNames {
		BODY = 'BodyError',
		PARAM = 'ParamError',
		LOGIC = 'LogicError',
		TOKEN = 'TokenError',
		AUTH = 'AuthError',
		NOT_FOUND = 'NotFoundError',
		BAD = 'InternalServerError',
	}

	return ErrorNames;
}
