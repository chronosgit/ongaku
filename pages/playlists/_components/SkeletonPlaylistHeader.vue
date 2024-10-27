<template>
	<section
		class="flex items-end gap-4 overflow-hidden bg-zinc-200 p-4 dark:bg-zinc-700"
		:style="{
			'border-top-left-radius': 'inherit',
			'border-top-right-radius': 'inherit',
		}"
	>
		<!-- Cover image skeleton -->
		<div
			class="xs:h-32 xs:w-32 h-28 w-28 shrink-0 animate-pulse rounded-lg bg-zinc-500 shadow-lg sm:h-56 sm:w-56"
		/>

		<!-- Details skeleton -->
		<div class="animate-pulse space-y-3">
			<!-- Type -->
			<div class="h-4 w-16 rounded-sm bg-zinc-500" />

			<!-- Name -->
			<div class="h-8 w-32 rounded-sm bg-zinc-500 sm:h-12 sm:w-64" />

			<!-- Etc -->
			<div class="h-4 w-44 rounded-sm bg-zinc-500 sm:w-80" />
		</div>
	</section>
</template>
