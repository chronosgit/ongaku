type SpotifyUri =
	| `spotify:album:${string}`
	| `spotify:artist:${string}`
	| `spotify:playlist:${string}`;

type TrackUri = `spotify:track:${string}`;

type OffsetType<Context extends SpotifyUri | undefined> = Context extends
	| `spotify:album:${string}`
	| `spotify:playlist:${string}`
	? { position?: number; uri?: TrackUri }
	: never;

export type FStartOrResumePlayback = <Context extends SpotifyUri | undefined>(
	contextUri?: Context,
	uris?: `spotify:track:${string}`[],
	offset?: OffsetType<Context>,
	positionMs?: number
) => void;
