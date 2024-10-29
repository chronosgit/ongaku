export default interface IServerApiSuccessResponse {
	success?: boolean;
	statusCode?: number;
	message?: string;
	data: Object;
}
