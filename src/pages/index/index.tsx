import React, { memo } from 'react'
import { connect } from 'umi'
import Modal from './components/Modal'
import Header from './components/Header'
import Qa from './components/Qa'
import styles from './index.less'

const Index = (props: any) => {
	const { app: { group }, index: { modal_visible, modal_type } } = props

	const props_modal = {
		group,
		visible: modal_visible,
		onOk () {},
		onCancel () {},
		modal_type
	}

	return (
		<div className={`${styles._local} w_100 border_box flex flex_column`}>
			<Modal {...props_modal} />
			<Header />
			<Qa />
		</div>
	)
}

export default connect(({ app, index }: any) => ({ app, index }))(Index)
