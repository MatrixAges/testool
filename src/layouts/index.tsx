import React, { memo, Fragment } from 'react'
import { useIntl } from 'umi'
import { Helmet } from 'react-helmet'
import Header from './components/Header'

const Index = (props: any) => {
	const { children } = props
	const lang = useIntl()

	return (
		<Fragment>
			<Helmet>
				<title>{lang.formatMessage({ id: 'site.title' })}</title>
			</Helmet>
			<Header />
			{children}
		</Fragment>
	)
}

export default memo(Index)
