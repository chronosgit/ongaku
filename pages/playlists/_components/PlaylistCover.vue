<script setup lang="ts">
	import { IconQuestionMark } from '~/components/ui/icons';
	import type IImageObject from '~/interfaces/business/IImageObject';

	const props = defineProps<{
		avatars: IImageObject[] | null | undefined;
	}>();

	const avatar = computed(() => {
		if (!props.avatars?.length) return '';

		return props.avatars[0].url;
	});
</script>

<template>
	<NuxtImg
		v-if="avatar"
		:src="avatar"
		alt="avatar"
		class="h-72 w-72 shrink-0 self-center rounded-md sm:h-44 sm:w-44"
	/>

	<div
		v-else
		class="flex h-72 w-72 shrink-0 items-center justify-center self-center rounded-md bg-zinc-300 sm:h-44 sm:w-44 dark:bg-zinc-800"
	>
		<ClientOnly>
			<IconQuestionMark class="scale-[300%] dark:text-zinc-400" />
		</ClientOnly>
	</div>
</template>
