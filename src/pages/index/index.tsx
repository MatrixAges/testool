import React, { memo } from 'react'
import { connect, useIntl } from 'umi'
import Modal from './components/Modal'
import Header from './components/Header'
import Filter from './components/Filter'
import Qas from './components/Qas'
import styles from './index.less'

const Index = (props: any) => {
	const {
		dispatch,
		app: { group },
		index: { modal_visible, modal_type, filter_visible }
	} = props
	const lang = useIntl()

	const enum_modal_title = {
		add_group: lang.formatMessage({ id: 'index.modal.title.add_group' }),
		add_qa: lang.formatMessage({ id: 'index.modal.title.add_qa' })
	}

	const props_modal = {
		title: enum_modal_title[modal_type],
		group,
		modal_type,
		visible: modal_visible,
		onOk () {},
		onCancel () {
			dispatch({
				type: 'index/updateState',
				payload: { modal_visible: false }
			})
		}
	}

	const props_header = {
		name: 'webpack',
            onClearGroup() {
                  // 清除当前分组的打分数据
            },
		onAddGroup () {
			dispatch({
				type: 'index/updateState',
				payload: {
					modal_visible: true,
					modal_type: 'add_group'
				}
			})
		},
		onFilter () {
			dispatch({
				type: 'index/updateState',
				payload: { filter_visible: !filter_visible }
			})
		},
		onAddQa () {
			dispatch({
				type: 'index/updateState',
				payload: {
					modal_visible: true,
					modal_type: 'add_qa'
				}
			})
		}
	}

	return (
		<div className={`${styles._local} w_100 border_box flex flex_column`}>
			<Modal {...props_modal} />
			<Header {...props_header} />
			{filter_visible && <Filter />}
			<Qas />
		</div>
	)
}

export default memo(connect(({ app, index }: any) => ({ app, index }))(Index))
