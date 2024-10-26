export default function (entity: any) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(entity);

		reader.onload = () => resolve(reader.result);

		reader.onerror = (error) => reject(error);
	});
}
