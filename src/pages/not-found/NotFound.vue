<script setup>
	import { useI18n } from 'vue-i18n';
	import { useRouter } from 'vue-router';
	import Logo from '@/common/components/Logo.vue';

	const router = useRouter();
	const { t, locale } = useI18n();

	const btnOnClick = () => router.push(`/${locale.value}`);
</script>

<template>
	<section
		class="w-screen h-screen flex flex-col justify-center items-center bg-spotify-black"
	>
		<div class="max-w-20">
			<Logo />
		</div>

		<h1 class="mt-8 font-ru text-5xl text-white font-bold">
			{{ t('not-found.page-not-available') }}
		</h1>

		<p class="mt-4 text-gray-400">
			{{ t('not-found.something-went-wrong') }}
		</p>

		<!-- Refactorable? -->
		<button role="link" class="font-bold bg-white" @click="btnOnClick">
			{{ t('not-found.btn-main') }}
		</button>
	</section>
</template>
