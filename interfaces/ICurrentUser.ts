export default interface ICurrentUser {
	id: string;
	type: string;
	email: string;
	display_name: string;
	country: string;
	images: [];
	followers: Object;

	explicit_content: Object;
	external_urls: Object;
	product: string;
	href: string;
	uri: string;
}
