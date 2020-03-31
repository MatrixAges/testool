export default (theme: 'light' | 'dark') => {
	if (theme === 'light') {
		window.less.modifyVars({})
	} else {
		window.less.modifyVars({
			'@border-color-base': '#292929',
			'@text-color': '#ffffff',
			'@disabled-color': '#333333',
			'@item-hover-bg': '#333333',
			'@component-background': '#202124',
			'@background-color-light': '#333333',
			'@background-color-base': '#333333',
			'@text-color-secondary': '#333333',
			'@body-background': '#202124'
		})
	}
}
