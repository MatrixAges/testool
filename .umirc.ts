import path, { resolve } from 'path'
import { defineConfig } from 'umi'
// import OfflinePlugin from 'offline-plugin'
import THEME from './src/themes/theme.config'

export default defineConfig({
	theme: THEME,
	antd: {},
	cssnano: {},
	history: { type: 'hash' },
	favicon: '/site/favicon.ico',
	dva: { immer: true, hmr: true },
	alias: { R: resolve(__dirname, './') },
	locale: { default: 'en-US', antd: true },
	dynamicImport: { loading: '@/components/Loader/index' },
	base: '/testool/',
	publicPath: '/testool/',
	plugins: [ 'umi-plugin-gh-pages' ],
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

		// memo.plugin('offline-plugin').use(OfflinePlugin, [
		// 	{
		// 		safeToUseOptionalCaches: true,
		// 		ServiceWorker: { events: true },
		// 		AppCache: { events: true }
		// 	}
		// ])
	}
})
