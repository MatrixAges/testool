import React, { memo } from 'react'
import { connect, useIntl } from 'umi'
import { message } from 'antd'
import store from 'store'
import Modal from './components/Modal'
import Header from './components/Header'
import Filter from './components/Filter'
import Qas from './components/Qas'
import { IQas, IRate } from '@/db/models/Qas'

export interface IORate extends IRate {
	index: number
}

const Index = (props: any) => {
	const {
		loading,
		dispatch,
		app: { groups, current_group },
		index: { modal_visible, modal_type, filter_visible, qas,no_more }
	} = props
	const lang = useIntl()

	const enum_modal_title = {
		add_group: lang.formatMessage({ id: 'index.modal.title.add_group' }),
		add_qa: lang.formatMessage({ id: 'index.modal.title.add_qa' })
	}

	const props_modal = {
		groups,
		current_group,
		modal_type,
		visible: modal_visible,
		title: enum_modal_title[modal_type],
		onCancel () {
			dispatch({
				type: 'index/updateState',
				payload: { modal_visible: false }
			})
		},
		onAddGroup (name: string) {
			if (groups.indexOf(name) === -1) {
				dispatch({
					type: 'index/addGroup',
					payload: {
						name,
						message_success: lang.formatMessage({
							id: 'index.modal.add_group.success'
						}),
						message_failed: lang.formatMessage({
							id: 'index.modal.add_group.failed'
						})
					}
				})
			} else {
				message.warn(
					lang.formatMessage({
						id: 'index.modal.add_group.repeat'
					})
				)
			}
		},
		onChangeCurrentGroup (v: string) {
			dispatch({
				type: 'index/updateState',
				payload: { modal_visible: false }
			})

			dispatch({
				type: 'app/updateState',
				payload: { current_group: v }
			})

			store.set('current_group', v)
		},
		onAddQa (params: IQas) {
			dispatch({
				type: 'index/addQa',
				payload: {
					current_group,
					params,
					message_success: lang.formatMessage({
						id: 'index.modal.add_qa.success'
					}),
					message_failed: lang.formatMessage({
						id: 'index.modal.add_qa.failed'
					})
				}
			})
		}
	}

	const props_header = {
		name: current_group,
		onClearGroup () {
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

      const props_qas = {
            no_more,
		qas,
		groups,
		dispatch,
		current_group,
		loading: loading.effects['index/loadMore'],
		onAddGroup () {
			dispatch({
				type: 'index/updateState',
				payload: {
					modal_visible: true,
					modal_type: 'add_group'
				}
			})
		},
		rate (params: IORate) {
			dispatch({
				type: 'index/rate',
				payload: {
					current_group,
					params,
					message_success: lang.formatMessage({
						id: 'index.modal.rate.success'
					}),
					message_failed: lang.formatMessage({
						id: 'index.modal.rate.failed'
					})
				}
			})
		}
	}

	return (
		<div className='w_100 border_box flex flex_column'>
			<Modal {...props_modal} />
			{groups.length > 0 && <Header {...props_header} />}
			{filter_visible && <Filter />}
			<Qas {...props_qas} />
		</div>
	)
}

export default memo(connect(({ app, index, loading }: any) => ({ app, index, loading }))(Index))
