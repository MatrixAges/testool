import path, { resolve } from 'path'
import { defineConfig } from 'umi'
import OfflinePlugin from 'offline-plugin'
import WebpackPwaManifest from 'webpack-pwa-manifest'
import THEME from './src/themes/theme.config'

export default defineConfig({
	antd: {},
	cssnano: {},
	theme: THEME,
	base: '/testool/',
	favicon: 'favicon.ico',
	publicPath: '/testool/',
	dva: { immer: true, hmr: true },
	alias: { R: resolve(__dirname, './') },
	links: [ { rel: 'manifest', href: 'manifest.json' } ],
	dynamicImport: { loading: '@/components/Loader/index' },
	locale: { baseNavigator: false, default: 'en-US', antd: true },
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

		memo.plugin('offline-plugin').use(OfflinePlugin, [ webpack_plugin_offline ])
		memo.plugin('webpack-pwa-manifest').use(WebpackPwaManifest, [ webpack_plugin_pwa ])
	}
})

const webpack_plugin_offline: any = {
	safeToUseOptionalCaches: true,
	ServiceWorker: { events: true },
	AppCache: { events: true }
}

const webpack_plugin_pwa: any = {
	name: 'Testool',
	short_name: 'Testool',
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
