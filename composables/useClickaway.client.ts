export default function (templateRefKey: string, initValue: boolean = false) {
	const templateRef = useTemplateRef(templateRefKey) as Ref<
		HTMLElement | ComponentPublicInstance | null
	>;

	const {
		value: isActive,
		activate,
		disactivate,
		toggle,
	} = useToggle(initValue);

	const onDocumentClick = (e: MouseEvent) => {
		const clickedTarget = e.target as Element;

		if (!clickedTarget || !templateRef?.value) return;

		let checkedEl: HTMLElement | null = null;

		if (templateRef.value instanceof HTMLElement) {
			checkedEl = templateRef.value;
		} else {
			checkedEl = templateRef.value.$el;
		}

		if (checkedEl && !checkedEl.contains(clickedTarget)) {
			isActive.value = false;
		}
	};

	onMounted(() => document.addEventListener('mousedown', onDocumentClick));

	onUnmounted(() => document.removeEventListener('mousedown', onDocumentClick));

	return { isActive, activate, disactivate, toggle };
}
