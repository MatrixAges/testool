export default (theme: 'light' | 'dark') => {
	if (theme === 'light') {
		window.less.modifyVars({
			'@border-color-split': 'whitesmoke',
			'@border-color-base': 'whitesmoke'
		})
	} else {
		window.less.modifyVars({
			'@text-color': '#ffffff',
			'@disabled-color': '#333333',
			'@item-hover-bg': '#333333',
			'@component-background': '#202124',
			'@background-color-light': '#333333',
			'@background-color-base': '#333333',
			'@text-color-secondary': '#333333',
			'@body-background': '#202124',
			'@border-color': '#242424',
			'@border-color-base': '#242424',
			'@border-color-split': '#242424'
		})
	}
}
