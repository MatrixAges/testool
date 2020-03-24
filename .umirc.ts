import path, { resolve } from 'path'
import { defineConfig } from 'umi'
import OfflinePlugin from 'offline-plugin'
import WebpackPwaManifest from 'webpack-pwa-manifest'
import THEME from './src/themes/theme.config'

export default defineConfig({
	theme: THEME,
	antd: {},
	cssnano: {},
	favicon: 'favicon.ico',
	dva: { immer: true, hmr: true },
	alias: { R: resolve(__dirname, './') },
	dynamicImport: { loading: '@/components/Loader/index' },
	locale: { baseNavigator: false, default: 'en-US', antd: true },
	base: '/testool/',
	publicPath: '/testool/',
	links: [
		{
			rel: 'manifest',
			href: 'manifest.json'
		}
	],
	extraBabelPlugins: [
		[
			'import',
			{
				libraryName: 'lodash',
				libraryDirectory: '',
				camel2DashComponentName: false
			}
		]
	],
	chainWebpack (memo) {
		memo.resolve.alias.set(
			'moment$',
			path.resolve(__dirname, 'node_modules/moment/moment.js')
		)

		memo.plugin('offline-plugin').use(OfflinePlugin, [
			{
				safeToUseOptionalCaches: true,
				ServiceWorker: { events: true },
				AppCache: { events: true }
			}
		])

		memo.plugin('webpack-pwa-manifest').use(WebpackPwaManifest, [
			{
				name: 'Testool',
				short_name: 'TOL',
				fingerprints: false,
				description: 'A artifact for the test/interview/exam.',
				background_color: '#ffffff',
				theme_color: '#f44336',
				crossorigin: 'use-credentials',
				icons: [
					{
						src: path.resolve(__dirname, 'public/logo.png'),
						sizes: [ 96, 128, 192, 256, 384, 512 ]
					},
					{
						src: path.resolve(__dirname, 'public/logo_white.png'),
						size: '512x512'
					}
				]
			}
		])
	}
})
