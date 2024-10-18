export default function (initValue: boolean = false) {
	const value = ref(initValue);

	const toggleValue = () => (value.value = !value.value);

	const activateValue = () => (value.value = true);

	const disactivateValue = () => (value.value = false);

	return { value, toggleValue, activateValue, disactivateValue };
}
