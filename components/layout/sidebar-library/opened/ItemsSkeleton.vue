<template>
	<div class="flex flex-col gap-3">
		<div v-for="_ in 12" class="flex animate-pulse items-center gap-3">
			<div class="h-12 w-12 rounded-md bg-gray-300 dark:bg-gray-800"></div>

			<div class="flex-1 space-y-1.5">
				<div class="h-4 max-w-28 bg-gray-300 dark:bg-gray-800"></div>

				<div class="h-4 max-w-14 bg-gray-300 dark:bg-gray-800"></div>
			</div>
		</div>
	</div>
</template>
