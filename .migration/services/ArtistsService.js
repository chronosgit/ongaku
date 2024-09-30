import axiosPrivate from '@/http/axiosPrivate';

class ArtistsService {
	// https://developer.spotify.com/documentation/web-api/reference/get-an-artist
	// artistId - string (REQUIRED)
	static async getArtist(artistId) {
		try {
			const res = axiosPrivate.get(`/artists/${artistId}`);

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
	// artistsIds - string (REQUIRED, comma-separated ids)
	static async getSeveralArtists(artistsIds) {
		try {
			if (!artistsIds) throw Error('Artists IDs must be valid');

			const res = axiosPrivate.get('/artists', { params: { ids: artistsIds } });

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
	// artistId - string (REQUIRED)
	// includeGroups - string
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0, indexes start from zero)
	static async getArtistAlbums(artistId, includeGroups, limit, offset) {
		try {
			if (!artistId) throw Error('Artist ID must be valid');

			const res = axiosPrivate.get(`/artists/${artistId}/albums`, {
				params: { includeGroups, limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
	// artistId - string (REQUIRED)
	static async getArtistTopTracks(artistId) {
		try {
			if (!artistId) throw Error('Artist ID must be valid');

			const res = axiosPrivate.get(`/artists/${artistId}/top-tracks`);

			return res;
		} catch (err) {
			throw err;
		}
	}

	// https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
	// artistId - string (REQUIRED)
	static async getArtistRelatedArtists(artistId) {
		try {
			if (!artistId) throw Error('Artist ID must be valid');

			const res = axiosPrivate.get(`/artists/${artistId}/related-artists`);

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default ArtistsService;
