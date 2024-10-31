<script setup lang="ts">
	import { IconClock } from '~/components/ui/icons';
</script>

<template>
	<div
		class="flex justify-between gap-3 border-b-[1px] border-b-zinc-500 border-opacity-35 p-2 pb-2 text-sm text-zinc-500 dark:text-zinc-400"
	>
		<span class="w-10 grow-0 items-center text-center">#</span>

		<p class="basis-[100%] sm:basis-[60%] md:basis-[50%]">
			{{ $t('modules.tracks-feed.name') }}
		</p>

		<p class="hidden sm:block sm:basis-[40%] md:basis-[30%]">
			{{ $t('modules.tracks-feed.album') }}
		</p>

		<p class="hidden md:block md:basis-[20%]">
			{{ $t('modules.tracks-feed.added_at') }}
		</p>

		<div class="w-20 grow-0 text-center">
			<ClientOnly>
				<IconClock class="scale-125" />
			</ClientOnly>
		</div>
	</div>
</template>
