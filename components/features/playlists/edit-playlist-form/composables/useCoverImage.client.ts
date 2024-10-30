import type IImageObject from '~/interfaces/business/IImageObject';

export default function (originalImage: IImageObject | null) {
	const existingImage = ref<IImageObject | null>(originalImage);
	const localImageBase64 = ref<string | null>(null);

	const updateLocalImage = async () => {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';

		fileInput.click();

		fileInput.addEventListener('change', async (e) => {
			const target = e.target as HTMLInputElement;

			if (!target || !target.files) {
				console.error('No input or files were found');
				return;
			}

			const file = target.files[0];

			const allowedFileTypes = ['image/jpeg'];

			if (!allowedFileTypes.includes(file.type)) {
				console.error('File type must be of JPEG or JPG');
				return;
			}

			const base64 = (await convertToBase64Client(file)) as string;

			if (getStringSizeInKBClient(base64) > 256) {
				console.error('Image is too big');
				return;
			}

			localImageBase64.value = base64;
		});
	};

	const removeLocalImage = () => (localImageBase64.value = null);

	return {
		existingImage,
		localImageBase64,
		updateLocalImage,
		removeLocalImage,
	};
}
