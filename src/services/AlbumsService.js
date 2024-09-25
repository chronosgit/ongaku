import axiosPrivate from '@/http/axiosPrivate';

class AlbumsService {
	// private
	static async getAlbum(albumId) {
		try {
			const res = await axiosPrivate.get(`/albums/${albumId}`);

			return res;
		} catch (err) {
			throw err;
		}
	}

	// private
	// albumsIds - string (comma-separated ids)
	static async getSeveralAlbums(albumsIds) {
		try {
			const res = await axiosPrivate.get('albums', {
				params: { ids: albumsIds },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// private
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0)
	static async getAlbumTracks(albumId, limit, offset) {
		try {
			const res = await axiosPrivate.get(`/albums/${albumId}/tracks`, {
				params: { limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// private
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0). Indexes start from 0
	static async getMySavedAlbums(limit, offset) {
		try {
			const res = axiosPrivate.get('/me/albums', { params: { limit, offset } });

			return res;
		} catch (err) {
			throw err;
		}
	}

	// private
	// albumsIds - array[string]
	static async saveAlbumsForMe(albumsIds) {
		try {
			const res = axiosPrivate.put('/me/albums', { ids: albumsIds });

			return res;
		} catch (err) {
			throw err;
		}
	}

	// private
	// albumsIds - array[string]
	static async removeMySavedAlbums(albumsIds) {
		try {
			const res = axiosPrivate.delete('/me/albums', {
				data: { ids: albumsIds },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// private
	// albumsIds - string (comma-separated ids)
	static async checkIfMyAlbums(albumsIds) {
		try {
			const res = axiosPrivate.get('/me/albums/contains', {
				params: { ids: albumsIds },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// private
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0). Indexes start from 0
	static async getNewAlbumReleases(limit, offset) {
		try {
			const res = axiosPrivate.get('/browse/new-releases', {
				params: { limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default AlbumsService;
