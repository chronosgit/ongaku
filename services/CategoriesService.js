import axiosPrivate from '@/http/axiosPrivate';

class CategoriesService {
	// https://developer.spotify.com/documentation/web-api/reference/get-categories
	// private
	// locale - string (language)
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0, indexes start from zero)
	static async getSeveralBrowseCategories(locale, limit, offset) {
		try {
			const res = axiosPrivate.get('/browse/categories', {
				params: { locale, limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-a-category
	// categoryId - string (REQUIRED, eg. party)
	// locale - string (language)
	static async getSingleBrowseCategory(categoryId, locale) {
		try {
			if (!categoryId) throw Error('Category ID must be valid');

			const res = axiosPrivate.get(`/browse/categories/${categoryId}`, {
				params: { locale },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default CategoriesService;
