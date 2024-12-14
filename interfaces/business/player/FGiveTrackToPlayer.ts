export type SpotifyUri =
	| `spotify:album:${string}`
	| `spotify:artist:${string}`
	| `spotify:playlist:${string}`
	| `spotify:track:${string}`;

type TrackUri = `spotify:track:${string}`;

type OffsetType = { position?: number; uri?: TrackUri };

export type FStartOrResumePlayback = <Context extends SpotifyUri | undefined>(
	contextUri?: Context,
	uris?: `spotify:track:${string}`[],
	offset?: OffsetType,
	positionMs?: number
) => void;

// type SpotifyUri =
// 	| `spotify:album:${string}`
// 	| `spotify:artist:${string}`
// 	| `spotify:playlist:${string}`
// 	| `spotify:track:${string}`;

// type TrackUri = `spotify:track:${string}`;

// type OffsetType<Context extends SpotifyUri | undefined> = Context extends
// 	| `spotify:album:${string}`
// 	| `spotify:playlist:${string}`
// 	? { position?: number; uri?: TrackUri }
// 	: never;

// export type FStartOrResumePlayback = <Context extends SpotifyUri | undefined>(
// 	contextUri?: Context,
// 	uris?: `spotify:track:${string}`[],
// 	offset?: OffsetType<Context>,
// 	positionMs?: number
// ) => void;
