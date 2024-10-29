<script setup lang="ts">
	import { IconQuestionMark } from '~/components/ui/icons';
	import type IImageObject from '~/interfaces/business/IImageObject';

	const props = defineProps<{ image: IImageObject | null }>();
</script>

<template>
	<NuxtImg
		v-if="props.image?.url"
		:src="props.image.url"
		class="h-4/5 w-4/5 rounded-md"
	/>

	<!-- Cover image placeholder -->
	<div
		v-else
		class="flex h-4/5 w-4/5 items-center justify-center rounded-md bg-zinc-300 dark:bg-zinc-700"
	>
		<ClientOnly>
			<IconQuestionMark class="scale-150 text-zinc-400 dark:text-zinc-500" />
		</ClientOnly>
	</div>
</template>
