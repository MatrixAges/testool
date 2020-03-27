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
		qas: [],
		no_more: false
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
		*loadMore ({ payload }, { call, put, select }) {
			const { qas } = yield select(({ index }) => index)
			const { current_group, page, page_size } = payload

			const res = yield call(Service_getQas, current_group, page, page_size)

			if (res.length === 0) {
				yield put({
					type: 'updateState',
					payload: { no_more: true }
				})

				return
			}

			yield put({
				type: 'updateState',
				payload: { qas: qas.concat(res) }
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
		*rate ({ payload }, { call, put, select }) {
			const { qas } = yield select(({ index }) => index)
			const {
				current_group,
				params: { id, rate, index },
				message_success,
				message_failed
			} = payload
			const params = { id, rate }

			const res = yield call(Service_rate, current_group, params)

			if (res) {
				message.success(message_success)
			} else {
				message.error(message_failed)
			}

			qas[index].rates.push({ rate, create_at: new Date().valueOf() })

			yield put({
				type: 'updateState',
				payload: { qas: qas }
			})
		}
	}
})
