<script setup lang="ts">
	import {
		IconCheck,
		IconClose,
		IconError,
		IconExclamation,
		IconFeedback,
		IconInfo,
	} from '~/components/ui/icons';
	import type IToast from '~/interfaces/IToast';

	const props = defineProps<{ toast: IToast }>();
	const emit = defineEmits<{ (e: 'removeToast', toastId: string): void }>();

	const isAlive = ref(true);

	onMounted(() => {
		setTimeout(() => {
			isAlive.value = false;

			emit('removeToast', props.toast.id);
		}, props.toast.lifespan);
	});

	const toastClass = computed(() => {
		switch (props.toast.type) {
			case 'success':
				return 'text-green-700 bg-green-600';
			case 'warn':
				return 'text-orange-400 bg-orange-400';
			case 'info':
				return 'text-blue-600 bg-blue-500';
			case 'error':
				return 'text-red-600 bg-red-500';
			default:
				return 'text-zinc-600 bg-zinc-500';
		}
	});

	const icon = computed(() => {
		switch (props.toast.type) {
			case 'success':
				return IconCheck;
			case 'warn':
				return IconExclamation;
			case 'info':
				return IconInfo;
			case 'error':
				return IconError;
			default:
				return IconFeedback;
		}
	});
</script>

<template>
	<div
		v-if="isAlive"
		class="absolute left-1/2 top-0 z-[60] flex w-1/2 -translate-x-1/2 translate-y-2 items-center justify-between gap-3 rounded-md px-4 py-2 text-white shadow-lg"
		:class="[toastClass, props.toast.tw]"
	>
		<!-- Message -->
		<div class="flex items-center gap-3">
			<div
				class="flex scale-150 items-center justify-center rounded-full p-0.5"
			>
				<ClientOnly>
					<component :is="icon"></component>
				</ClientOnly>
			</div>

			<p class="w-full text-white">{{ props.toast.message }}</p>
		</div>

		<ClientOnly>
			<IconClose
				class="scale-150 cursor-pointer text-white"
				@click="emit('removeToast', props.toast.id)"
			/>
		</ClientOnly>
	</div>
</template>
