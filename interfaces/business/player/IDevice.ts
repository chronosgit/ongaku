export default interface IDevice {
	id?: string | null;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: string;
	volume_percent?: number | null;
	supports_volume: boolean;
}
