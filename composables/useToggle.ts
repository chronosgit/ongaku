export default function (initValue: boolean = false) {
	const value = ref(initValue);

	const toggle = () => (value.value = !value.value);

	const activate = () => (value.value = true);

	const disactivate = () => (value.value = false);

	return { value, toggle, activate, disactivate };
}
