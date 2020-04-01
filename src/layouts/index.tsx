import React, { memo, Fragment } from 'react'
import { connect, useIntl } from 'umi'
import { Helmet } from 'react-helmet'
import Header from './components/Header'
import changeTheme from '@/themes/changeTheme'
import styles from './index.less'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()

const Index = (props: any) => {
	const { children, theme } = props
	const lang = useIntl()

	if (process.env.NODE_ENV !== 'development') {
		changeTheme(theme)
	}

	return (
		<Fragment>
			<Helmet>
				<title>{lang.formatMessage({ id: 'site.title' })}</title>
			</Helmet>
			<Header />
			<div
				className={`
                              ${theme === 'dark' ? styles.dark : ''} 
                              w_100 flex justify_center
                        `}
			>
				<div className={styles.container}>{children}</div>
			</div>
		</Fragment>
	)
}

export default memo(connect(({ app: { theme } }: any) => ({ theme }))(Index))
