import modelExtend from 'dva-model-extend'
import pageModel from '@/utils/model'
import { history } from 'umi'
import { message } from 'antd'
import { Service_addGroup } from '@/services'

export default modelExtend(pageModel, {
	namespace: 'index',

	state: {
		modal_visible: false,
		modal_type: 'add_group',
		filter_visible: false
	},

	subscriptions: {
		setup ({ dispatch, history }) {
			history.listen((location) => {
				if (location.pathname === '/') {
					dispatch({
						type: 'query',
						payload: {
							...location.query
						}
					})
				}
			})
		}
	},

	effects: {
		*query ({}, {}) {},
		*addGroup ({ payload }, { call, put }) {
			const { name, message_success, message_failed } = payload

			const res = yield call(Service_addGroup, name)

			if (res) {
				message.success(message_success)
			} else {
				message.error(message_failed)
			}

			history.push('/')

			yield put({
				type: 'updateState',
				payload: { modal_visible: false }
			})
		}
	}
})
