import { createApp } from 'vue';
import App from './App.vue';
import router from '@router/router';
import { setupI18n } from '@localization/i18n';
import './style.css';

const app = createApp(App);

app.config.errorHandler = (err, vm, info) => {
	const errorComponentName = vm.$options.__name;

	console.error(
		`${err}\nFailed component: ${errorComponentName}\nOccured in ${info}`
	);
};

const possibleInitLocale = window.location.pathname.split('/')[1] || 'en';
export const i18n = setupI18n(possibleInitLocale);

app.use(i18n).use(router).mount('#app');
