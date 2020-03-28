import React, { memo, Fragment } from 'react'
import { useIntl } from 'umi'
import { BackTop } from 'antd'
import { Helmet } from 'react-helmet'
import Header from './components/Header'
import styles from './index.less'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()

const Index = (props: any) => {
	const { children } = props
	const lang = useIntl()

	return (
		<Fragment>
			<Helmet>
				<title>{lang.formatMessage({ id: 'site.title' })}</title>
			</Helmet>
			<Header />
			<div className='w_100 flex justify_center'>
				<div className={styles.container}>{children}</div>
			</div>
                  <BackTop />
		</Fragment>
	)
}

export default memo(Index)
