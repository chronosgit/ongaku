<script setup>
	import useLocalization from '@/common/composables/useLocalization';

	const { t, supportedLocales, onLocaleChange } = useLocalization();

	const onSelectChange = (e) => {
		onLocaleChange(e.target.value);
	};
</script>

<template>
	<section class="">
		<h2>Home</h2>

		<p>{{ t('message') }}</p>

		<select @change="onSelectChange">
			<option v-for="l in supportedLocales" :name="l">
				{{ l }}
			</option>
		</select>
	</section>
</template>
