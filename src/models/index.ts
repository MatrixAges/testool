import modelExtend from 'dva-model-extend'
import pageModel from '@/utils/model'
import { message } from 'antd'
import { cloneDeep } from 'lodash'
import {
	Service_addGroup,
	Service_addQa,
	Service_delQa,
	Service_putQa,
	Service_searchQaByQuestion,
	Service_getQas,
	Service_getTotal,
	Service_rate,
	Service_clearRateLog
} from '@/services/index'

export default modelExtend(pageModel, {
	namespace: 'index',

	state: {
		modal_visible: false,
		modal_type: '',
		filter_visible: false,
		qas: [],
		total: 0,
		no_more: false,
		current_item: {},
		current_id: 0,
		current_index: 0,
		querying: false
	},

	subscriptions: {},

	effects: {
		*query ({ payload }, { call, put }) {
			const { current_group, page } = payload

			const qas = yield call(Service_getQas, current_group, page)
			const total = yield call(Service_getTotal, current_group)

			yield put({
				type: 'updateState',
				payload: { qas, total }
			})

			yield put({
				type: 'updateState',
				payload: { qas, total }
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
		*delQa ({ payload }, { call, put, select }) {
			const { qas, current_id, current_index } = yield select(({ index }) => index)
			const { current_group, message_success, message_failed } = payload

			const res = yield call(Service_delQa, current_group, current_id)

			if (res) {
				message.success(message_success)
			} else {
				message.error(message_failed)
			}

			const _qas = cloneDeep(qas)

			_qas.splice(current_index, 1)

			yield put({
				type: 'updateState',
				payload: {
					modal_visible: false,
					qas: _qas
				}
			})
		},
		*putQa ({ payload }, { call, put, select }) {
			const { qas, current_id, current_index } = yield select(({ index }) => index)
			const { current_group, params, message_success, message_failed } = payload

			const res = yield call(Service_putQa, current_group, current_id, params)

			if (res) {
				message.success(message_success)
			} else {
				message.error(message_failed)
			}

			qas[current_index] = Object.assign(qas[current_index], params)

			yield put({
				type: 'updateState',
				payload: {
					modal_visible: false,
					qas: qas
				}
			})
		},
		*searchQaByQuestion ({ payload }, { call, put }) {
			const { current_group, query } = payload

			const qas = yield call(Service_searchQaByQuestion, current_group, query)

			yield put({
				type: 'updateState',
				payload: {
					modal_visible: false,
					qas: qas
				}
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
		},
		*clearRateLog ({ payload }, { call, put, select }) {
			const { qas } = yield select(({ index }) => index)
			const { current_group, id, index, message_success, message_failed } = payload

			const res = yield call(Service_clearRateLog, current_group, id)

			if (res) {
				message.success(message_success)
			} else {
				message.error(message_failed)
			}

			qas[index].rates = []

			yield put({
				type: 'updateState',
				payload: { qas: qas }
			})
		}
	}
})
