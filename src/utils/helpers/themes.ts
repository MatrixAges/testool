export const onChangeTheme = (e) => {
	const { key } = e.target.dataset

	if (!key) return

	switch (key) {
		case 'default':
			document.body.style.setProperty('--primary-color', 'blue')

			break
		case 'dark':
			document.body.style.setProperty('--primary-color', 'red')

			break
	}
}
