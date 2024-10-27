<script setup lang="ts">
	const props = defineProps<{
		playlistTracksQuantity: number;
		playlistLengthMs: number | null;
	}>();

	const { t } = useI18n();

	const formattedLength = computed(() => {
		if (props.playlistLengthMs == null) return 0;

		return getFormattedDuration(
			props.playlistLengthMs,
			t('dictionary.abbreviatures.day'),
			t('dictionary.abbreviatures.hour'),
			t('dictionary.abbreviatures.minute'),
			t('dictionary.abbreviatures.second')
		);
	});
</script>

<template>
	<p class="space-x-1 text-zinc-600 dark:text-zinc-400">
		<span>{{ $t('dictionary.track', props.playlistTracksQuantity) }}</span>
		<span>{{ formattedLength }}</span>
	</p>
</template>
