import React, { memo, Fragment } from 'react'
import { useIntl } from 'umi'
import { Helmet } from 'react-helmet'
import Header from './components/Header'
import styles from './index.less'

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
		</Fragment>
	)
}

export default memo(Index)
