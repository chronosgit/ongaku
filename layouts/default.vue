<script setup>
	import Toast from '~/components/ui/Toast.vue';

	const route = useRoute();
	const { t, te } = useI18n();

	const head = useLocaleHead({
		addDirAttribute: true,
		identifierAttribute: 'id',
		addSeoAttributes: true,
	});

	const title = computed(() =>
		te(route.meta.title)
			? t(route.meta.title)
			: 'Ongaku - Web Player: Music for everyone'
	);

	const { toasts, createToast, removeToast } = useToasts();

	provide('toasts', toasts);
	provide('createToast', createToast);
</script>

<template>
	<div>
		<Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
			<Head>
				<Title>{{ title }}</Title>

				<template v-for="link in head.link" :key="link.id">
					<Link
						:id="link.id"
						:rel="link.rel"
						:href="link.href"
						:hreflang="link.hreflang"
					/>
				</template>

				<template v-for="meta in head.meta" :key="meta.id">
					<Meta
						:id="meta.id"
						:property="meta.property"
						:content="meta.content"
					/>
				</template>
			</Head>

			<Body class="overflow-hidden">
				<TransitionGroup name="toasts">
					<Toast
						v-for="t in toasts"
						:key="t.id"
						:toast="t"
						@remove-toast="removeToast"
					/>
				</TransitionGroup>

				<slot />
			</Body>
		</Html>
	</div>
</template>

<style scoped>
	.toasts-enter-from,
	.toasts-leave-to {
		left: 50%;
		transform: translate(-50%, -1rem);
		opacity: 0;
	}

	.toasts-enter-to,
	.toasts-leave-from {
		left: 50%;
		transform: translate(-50%, 0.5rem);
		opacity: 1;
	}

	.toasts-enter-active,
	.toasts-leave-active {
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
	}
</style>
