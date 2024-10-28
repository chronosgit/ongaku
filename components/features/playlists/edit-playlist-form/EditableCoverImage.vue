<script setup lang="ts">
	import {
		IconAddPhoto,
		IconBuild,
		IconDelete,
		IconEdit,
		IconQuestionMark,
	} from '~/components/ui/icons';
	import type IImage from '~/interfaces/IImage';

	const props = defineProps<{
		image: IImage | null;
		userImageBase64: string;
	}>();

	const emit = defineEmits<{
		(e: 'updateImage'): void;
		(e: 'deleteImage'): void;
	}>();

	const { isActive: isImgOpts, toggle: toggleImgOpts } = useClickawayClient(
		'sidebar-library.edit-playlist-form.image'
	);
</script>

<template>
	<div class="shrink-0 basis-1/4">
		<div
			class="group relative flex aspect-square max-h-full min-h-24 w-full min-w-24 cursor-pointer items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-800"
		>
			<!-- User added avatar (new) -->
			<NuxtImg
				v-if="props.userImageBase64"
				:src="props.userImageBase64"
				class="rounded-md"
			/>

			<!-- Existing avatar -->
			<NuxtImg
				v-else-if="props.image?.url"
				:src="props.image?.url"
				class="rounded-md"
			/>

			<!-- No avatar -->
			<div v-else class="scale-150 rounded-md">
				<ClientOnly>
					<IconQuestionMark
						class="scale-150 text-zinc-400 group-hover:opacity-0 dark:text-zinc-500"
					/>
				</ClientOnly>
			</div>

			<!-- Absolute on-hover options dropdown -->
			<div
				class="peer absolute right-0 top-0 z-30 -translate-x-2 translate-y-2 group-hover:block sm:-translate-x-3 sm:translate-y-3"
				:class="{ block: isImgOpts, hidden: !isImgOpts }"
			>
				<!-- Trigger -->
				<ClientOnly>
					<IconBuild
						class="text- scale-150 text-zinc-500 sm:scale-[200%] dark:text-white"
						@mousedown.stop="toggleImgOpts()"
					/>
				</ClientOnly>

				<!-- Image options dropdown -->
				<div
					ref="sidebar-library.edit-playlist-form.image"
					class="absolute right-0 top-0 z-40 translate-x-16 translate-y-9 space-y-3 rounded-sm bg-zinc-300 p-3 dark:bg-zinc-700"
					:class="{ block: isImgOpts, hidden: !isImgOpts }"
				>
					<!-- Change image -->
					<div
						class="flex items-center gap-2 dark:text-white"
						@click="emit('updateImage')"
					>
						<ClientOnly>
							<IconAddPhoto />
						</ClientOnly>

						<p class="text-nowrap">
							{{
								$t('modules.sidebar-library.edit-playlist-form.image-change')
							}}
						</p>
					</div>

					<!-- Delete image -->
					<div
						class="flex items-center gap-2 dark:text-white"
						@click="emit('deleteImage')"
					>
						<ClientOnly>
							<IconDelete />
						</ClientOnly>

						<p class="text-nowrap">
							{{
								$t('modules.sidebar-library.edit-playlist-form.image-delete')
							}}
						</p>
					</div>
				</div>
			</div>

			<!-- On-hover 'choose image' overlay -->
			<div
				class="absolute z-20 hidden h-full w-full flex-col items-center justify-center gap-4 group-hover:flex peer-hover:hidden"
				:class="{
					'bg-black bg-opacity-50': props.image?.url || props.userImageBase64,
				}"
				@click="emit('updateImage')"
			>
				<ClientOnly>
					<IconEdit
						class="scale-150 text-zinc-500 sm:scale-[250%] dark:text-white"
					/>
				</ClientOnly>

				<p
					class="text-center text-sm font-medium text-zinc-500 sm:text-base dark:text-white"
				>
					{{ $t('modules.sidebar-library.edit-playlist-form.image-choose') }}
				</p>
			</div>
		</div>
	</div>
</template>
