import axiosPrivate from '@/http/axiosPrivate';

class AlbumsService {
	// https://developer.spotify.com/documentation/web-api/reference/get-an-album
	// albumId - string (REQUIRED)
	static async getAlbum(albumId) {
		try {
			if (!albumId) throw Error('Album ID must be valid');

			const res = await axiosPrivate.get(`/albums/${albumId}`);

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums
	// albumsIds - string (REQUIRED, comma-separated ids)
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

	// https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks
	// albumId - string (REQUIRED)
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

	// https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0, indexes start from zero)
	static async getMySavedAlbums(limit, offset) {
		try {
			const res = axiosPrivate.get('/me/albums', { params: { limit, offset } });

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/save-albums-user
	// albumsIds - array[string] (REQUIRED)
	static async saveAlbumsForMe(albumsIds) {
		try {
			if (!albumsIds) throw Error('Albums IDs must be valid');

			const res = axiosPrivate.put('/me/albums', { ids: albumsIds });

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/remove-albums-user
	// albumsIds - array[string] (REQUIRED)
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

	// https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums
	// albumsIds - string (REQUIRED, comma-separated ids)
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

	// https://developer.spotify.com/documentation/web-api/reference/get-new-releases
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0, indexes start from zero)
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
