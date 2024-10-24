<script setup lang="ts">
	import { IconClose, IconQuestionMark } from '~/components/ui/icons';

	const props = defineProps<{ isVisible: boolean }>();

	const emit = defineEmits<{
		(e: 'closeEditPlaylistForm'): void;
	}>();
</script>

<template>
	<div
		class="fixed inset-0 z-[999] items-center justify-center bg-black bg-opacity-70"
		:class="{ flex: props.isVisible, hidden: !props.isVisible }"
		@click="emit('closeEditPlaylistForm')"
	>
		<div
			class="mx-4 w-full max-w-3xl rounded-md bg-white p-4 dark:bg-zinc-900"
			@click.stop="console.log('Form')"
		>
			<!-- First row -->
			<div class="mb-4 flex items-center justify-between gap-1">
				<p class="text-lg font-bold dark:text-white">Изменение сведений</p>

				<IconClose
					class="scale-125 cursor-pointer text-zinc-500 transition-colors hover:text-black dark:hover:text-white"
					@click="emit('closeEditPlaylistForm')"
				/>
			</div>

			<!-- Main box -->
			<div class="mb-2 flex w-full items-center justify-between gap-3">
				<!-- Add playlist image -->
				<div class="shrink-0 basis-1/4">
					<div
						class="flex aspect-square max-h-full min-h-20 w-full min-w-20 items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-800"
					>
						<div class="scale-150">
							<IconQuestionMark
								class="scale-150 text-zinc-400 dark:text-zinc-500"
							/>
						</div>
					</div>
				</div>

				<!-- Inputs -->
				<div class="h-full w-full space-y-4">
					<!-- Playlist name -->
					<input
						type="text"
						placeholder="Plsylsit_1429_)0525"
						class="placeholder:text-gray block w-full rounded-md bg-zinc-200 p-2 font-bold dark:bg-zinc-800 dark:text-white"
					/>

					<!-- Playlist description -->
					<textarea
						id="edit-playlist-form-descr"
						type="text"
						placeholder="Добавить описание (необязательно)"
						class="block h-32 w-full resize-none rounded-md bg-zinc-200 p-2 font-bold dark:bg-zinc-800"
					/>
				</div>
			</div>

			<button
				class="ml-auto block rounded-full bg-black px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-black"
				@click="console.log('Save')"
			>
				Сохранить
			</button>
		</div>
	</div>
</template>
