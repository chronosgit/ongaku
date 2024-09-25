import axiosPrivate from '@/http/axiosPrivate';

class AlbumsService {
	// private
	// albumId - string
	static async getAlbum(albumId) {
		try {
			if (!albumId) throw Error('Album ID must be valid');

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
			if (!albumsIds) throw Error('Albums IDs must be valid');

			const res = await axiosPrivate.get('albums', {
				params: { ids: albumsIds },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// private
	// albumId - string
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0)
	static async getAlbumTracks(albumId, limit, offset) {
		try {
			if (!albumId) throw Error('Album ID must be valid');

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
			if (!albumsIds) throw Error('Albums IDs must be valid');

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
			if (!albumsIds) throw Error('Albums IDs must be valid');

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
		if (!albumsIds) throw Error('Albums IDs must be valid');

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
