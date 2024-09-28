import axiosPrivate from '@/http/axiosPrivate';

class PlaylistsService {
	// https://developer.spotify.com/documentation/web-api/reference/get-playlist
	// playlistId - string (REQUIRED)
	// fields - string (comma-separated list of fields to return)
	// additionalTypes - string (comma-separated list of types)
	static async getPlaylist(playlistId, fields, additionalTypes) {
		try {
			if (!playlistId) {
				throw Error('Playlist ID and fields must be valid');
			}

			const res = axiosPrivate.get(`/playlists/${playlistId}`, {
				params: { fields, additional_types: additionalTypes },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// TODO: requests don't alter anything for some reason
	// https://developer.spotify.com/documentation/web-api/reference/change-playlist-details
	// playlistId - string (REQUIRED)
	// name - string (new name for a playlist)
	// status - boolean (def: true, true for public)
	// collaborative - boolean (def: false, false is for non-co-op)
	// description - string
	static async changePlaylistDetails(
		playlistId,
		name,
		status,
		collaborative,
		description
	) {
		try {
			if (!playlistId) throw Error('Playlist ID must be valid');

			const payload = { name, public: status, collaborative, description };

			const res = axiosPrivate.put(`/playlists/${playlistId}`, payload);

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
	// playlistId - string (REQUIRED)
	// fields - string (comma-separated list of fields to return)
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0, indexes start from zero)
	// additionalTypes - string (comma-separated list of types)
	static async getPlaylistItems(
		playlistId,
		fields,
		limit,
		offset,
		additionalTypes
	) {
		try {
			if (!playlistId) throw Error('Playlist ID must be valid');

			const res = axiosPrivate.get(`/playlists/${playlistId}/tracks`, {
				params: { fields, limit, offset, additionalTypes },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// TODO: didn't test at all
	// https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks
	// playlistId - string (REQUIRED)
	// uris - array[string]
	// rangeStart - integer
	// insertBefore - integer
	// rangeLength - integer
	// shapshotId - string
	static async updatedPlaylistItems(
		playlistId,
		uris,
		rangeStart,
		insertBefore,
		rangeLength,
		snapshotId
	) {
		try {
			if (!playlistId) throw Error('Playlist ID must be valid');

			const payload = {
				uris,
				range_start: rangeStart,
				insert_before: insertBefore,
				range_length: rangeLength,
				snapshot_id: snapshotId,
			};

			const res = axiosPrivate.put(`/playlists/${playlistId}/tracks`, payload);

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
	// playlistId - string (REQUIRED)
	// position - integer (zero-based indexes)
	// uris - array[string]
	static async addItemsToPlaylist(playlistId, position, uris) {
		try {
			if (!playlistId || !Array.isArray(uris)) {
				throw Error('Playlist IDs and uris must be valid');
			}

			const payload = { uris, position };

			const res = axiosPrivate.post(`/playlists/${playlistId}/tracks`, payload);

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist
	// playlistId - string (REQUIRED)
	// tracks - array[objects] (REQUIRED)
	// snapshotId - string
	static async removePlaylistItems(playlistId, tracks, snapshotId) {
		try {
			if (!playlistId || !tracks) {
				throw Error('Playlist ID and tracks must be valid');
			}

			const res = axiosPrivate.delete(`/playlists/${playlistId}/tracks`, {
				data: { tracks, snapshotId },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0, zero-based indexes)
	static async getMyPlaylists(limit, offset) {
		try {
			const res = axiosPrivate.get('/me/playlists', {
				params: { limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists
	// userId - string (REQUIRED)
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0, zero-based indexes)
	static async getUserPlaylist(userId, limit, offset) {
		try {
			if (!userId) throw Error('User ID must be valid');

			const res = axiosPrivate.get(`/users/${userId}/playlists`, {
				params: { limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/ documentation/web-api/reference/create-playlist
	// userId - string (REQUIRED)
	// name - string
	// status - boolean (def: true, true for public)
	// collaborative - boolean (def: false, false is for non-co-op)
	// description - string
	static async createPlaylist(
		userId,
		name,
		status,
		collaborative,
		description
	) {
		try {
			if (!userId) throw Error('User ID must be valid');

			const payload = {
				name,
				public: status,
				collaborative,
				description,
			};

			const res = axiosPrivate.post(`/users/${userId}/playlists`, payload);

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists
	// locale - string
	// limit - integer (def: 20, min: 1: max: 50)
	// offset - integer (def: 0, zero-based indexes)
	static async getFeaturedPlaylists(locale, limit, offset) {
		try {
			const res = axiosPrivate.get('/browse/featured-playlists', {
				params: { locale, limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists
	// categoryId - string (REQUIRED)
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0, zero-based indexes)
	static async getCategoryPlaylists(categoryId, limit, offset) {
		try {
			if (!categoryId) throw Error('Category ID must be valid');

			const res = axiosPrivate.get(
				`/browse/categories/${categoryId}/playlists`,
				{
					params: { limit, offset },
				}
			);

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-playlist-cover
	// playlistId - string (REQUIRED)
	static async getPlaylistCoverImage(playlistId) {
		try {
			if (!playlistId) throw Error('Playlist ID must be valid');

			const res = axiosPrivate.get(`/playlists/${playlistId}/images`);

			return res;
		} catch (err) {
			throw err;
		}
	}

	// TODO: image won't upload, despite the 200 request (tho it has to be 202)
	// https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover
	// playlistId - string (REQUIRED)
	// base64Jpeg - base64 encoded JPEG image (max: 256KB, image/jpeg)
	static async addCustomPlaylistCoverImage(playlistId, base64Jpeg) {
		try {
			if (!playlistId) throw Error('Playlist ID must be valid');

			// TODO: maybe some validation on size and type of an image

			const res = axiosPrivate.put(
				`/playlists/${playlistId}/images`,
				base64Jpeg
			);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default PlaylistsService;
