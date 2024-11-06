<script setup lang="ts">
	import { IconMagnifier } from '~/components/ui/icons';

	const { input } = useSearchbar();
</script>

<template>
	<div
		class="flex items-center gap-2 rounded-full bg-zinc-200 px-3 py-2 dark:bg-zinc-900"
	>
		<LazyClientOnly>
			<IconMagnifier class="scale-150 text-zinc-500" />
		</LazyClientOnly>

		<input
			v-model="input"
			type="text"
			placeholder="Что хочешь включить?"
			class="bg-zinc-200 outline-none placeholder:text-zinc-500 dark:bg-zinc-900"
		/>
	</div>
</template>
