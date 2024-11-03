export default interface IServerApiSuccessResponse<T> {
	success?: boolean;
	statusCode?: number;
	message?: string;
	data: T;
}
