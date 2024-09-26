import axiosPrivate from '@/http/axiosPrivate';

class MarketsService {
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
