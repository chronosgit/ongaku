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
		class="h-72 w-72 shrink-0 rounded-md xs:h-44 xs:w-44 sm:h-56 sm:w-56"
	/>

	<div
		v-else
		class="flex h-72 w-72 shrink-0 items-center justify-center rounded-md bg-zinc-300 xs:h-44 xs:w-44 sm:h-56 sm:w-56 dark:bg-zinc-800"
	>
		<ClientOnly>
			<IconQuestionMark class="scale-[300%] dark:text-zinc-400" />
		</ClientOnly>
	</div>
</template>
