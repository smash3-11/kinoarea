import {
	resolve
} from 'path'
import {
	defineConfig
} from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				profile: resolve(__dirname, 'pages/profile/index.html'),
				"actor_info": resolve(__dirname, 'pages/actor_info/index.html'),
				"movie_info": resolve(__dirname, 'pages/movie_info/index.html'),
			},
		},
	},
})