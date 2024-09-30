import axiosPrivate from '@/http/axiosPrivate';

class MarketsService {
	// https://developer.spotify.com/documentation/web-api/reference/get-available-markets
	static async getAvailableMarkets() {
		try {
			const res = axiosPrivate.get('/markets');

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default MarketsService;
