import path from 'path'
import { generateTheme } from 'antd-theme-generator'

const webpack_plugin_antd_theme: any = {
	antDir: path.join(__dirname, './node_modules/antd'),
	stylesDir: path.join(__dirname, './src/themes'),
	varFile: path.join(__dirname, './src/themes/skins/default.less'),
	mainLessFile: path.join(__dirname, './src/global.less'),
	themeVariables: [ '@primary-color' ]
}

generateTheme(webpack_plugin_antd_theme)
	.then(() => {
		console.log('Theme generated successfully')
	})
	.catch((error) => {
		console.log('Error', error)
	})
