<script setup lang="ts">
	import { IconQuestionMark } from '~/components/ui/icons';
</script>

<template>
	<div class="shrink-0 basis-1/4">
		<div
			class="flex aspect-square max-h-full min-h-20 w-full min-w-20 items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-800"
		>
			<div class="scale-150">
				<ClientOnly>
					<IconQuestionMark
						class="scale-150 text-zinc-400 dark:text-zinc-500"
					/>
				</ClientOnly>
			</div>
		</div>
	</div>
</template>
