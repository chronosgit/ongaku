import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@common': path.resolve(__dirname, './src/common'),
			'@locales': path.resolve(__dirname, './src/locales'),
			'@modules': path.resolve(__dirname, './src/modules'),
			'@router': path.resolve(__dirname, './src/router'),
			'@services': path.resolve(__dirname, './src/services'),
			'@store': path.resolve(__dirname, './src/store'),
		},
	},
});
