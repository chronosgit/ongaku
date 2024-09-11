import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import './style.css';

const app = createApp(App);
const i18n = createI18n({ locale: 'en', fallbackLocale: 'en' });

app.config.errorHandler = (err, vm, info) => {
	const errorComponentName = vm.$options.__name;

	console.error(
		`${err}\nFailed component: ${errorComponentName}\nOccured in ${info}`
	);
};

app.use(i18n).mount('#app');
