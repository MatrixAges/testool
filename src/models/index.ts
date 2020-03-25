import modelExtend from 'dva-model-extend'
import pageModel from '@/utils/model'
import { message } from 'antd'
import { Service_addGroup, Service_addQa, Service_getQas, Service_rate } from '@/services/index'

export default modelExtend(pageModel, {
	namespace: 'index',

	state: {
		modal_visible: false,
		modal_type: 'add_group',
		filter_visible: false,
		qas: []
	},

	subscriptions: {},

	effects: {
		*query ({ payload }, { call, put }) {
			const { current_group } = payload

			const res = yield call(Service_getQas, current_group)

			yield put({
				type: 'updateState',
				payload: { qas: res }
			})
		},
		*addGroup ({ payload }, { call, put }) {
			const { name, message_success, message_failed } = payload

			const res = yield call(Service_addGroup, name)

			if (res) {
				message.success(message_success)
			} else {
				message.error(message_failed)
			}

			yield put({ type: 'app/query' })

			yield put({
				type: 'updateState',
				payload: { modal_visible: false }
			})
		},
		*addQa ({ payload }, { call, put }) {
			const { current_group, params, message_success, message_failed } = payload

			const res = yield call(Service_addQa, current_group, params)

			if (res) {
				message.success(message_success)
			} else {
				message.error(message_failed)
			}

			yield put({ type: 'app/query' })

			yield put({
				type: 'updateState',
				payload: { modal_visible: false }
			})
		},
		*rate ({ payload }, { call, put }) {
			const { current_group, params, message_success, message_failed } = payload

			const res = yield call(Service_rate, current_group, params)

			console.log(res)

			if (res) {
				message.success(message_success)
			} else {
				message.error(message_failed)
			}
		}
	}
})
