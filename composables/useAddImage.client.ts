export default function () {
	const imageBase64 = ref('');

	const updateImage = () => {
		const input = document.createElement('input');
		input.type = 'file';

		input.click();

		input.onchange = async (e) => {
			try {
				const { files } = e.target as HTMLInputElement;

				if (!files || !files[0]) {
					console.error('No files were received');
					return;
				}

				const file = files[0];

				if (file.type !== 'image/jpeg') {
					console.error('Image must be .jpeg or .jpg');
					return;
				}

				convertToBase64Client(file).then(
					(base64) => (imageBase64.value = base64 as string)
				);
			} catch (err) {
				console.error(err);

				throw err;
			}
		};
	};

	const deleteImage = () => (imageBase64.value = '');

	return { imageBase64, updateImage, deleteImage };
}
