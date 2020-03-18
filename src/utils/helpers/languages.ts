import { setLocale } from 'umi'

export const onChangeLanguage = (e) => {
	const { key } = e.target.dataset

	if (!key) return

	switch (key) {
		case 'cn':
			setLocale('zh-CN', false)
			break
		case 'en':
			setLocale('en-US', false)
			break
	}
}
