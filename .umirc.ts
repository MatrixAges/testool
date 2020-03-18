import path, { resolve } from 'path'
import { defineConfig } from 'umi'
import THEME from './src/themes/theme.config'

export default defineConfig({
	theme: THEME,
	antd: {},
	cssnano: {},
	locale: { default: 'en-US', antd: true },
	favicon: '/site/favicon.ico',
	dva: { immer: true, hmr: true },
	alias: { R: resolve(__dirname, './') },
	dynamicImport: { loading: '@/components/Loader/index' },
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
	}
})
