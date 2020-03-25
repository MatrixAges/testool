import { message } from 'antd'
import store from 'store'
import { Service_addTableGroups, Service_getAllGroups, Service_deleteGroup } from '@/services/app'

export default {
	namespace: 'app',

	state: {
		groups: [],
		current_group: ''
	},

	subscriptions: {
		setup ({ dispatch, history }) {
			history.listen((location: any) => {
				dispatch({
					type: 'query',
					payload: {
						...location.query
					}
				})
			})
		}
	},

	effects: {
		*query ({}, { call, put, select }) {
			const logs = yield call(Service_addTableGroups)

			if (!logs) return

			const groups = yield call(Service_getAllGroups)

			if (groups.length === 0) {
				store.set('current_group', null)
			}

			const c_group = store.get('current_group')

			yield put({
				type: 'updateState',
				payload: {
					groups,
					current_group:
						groups.indexOf(c_group) === -1 ||
						c_group === null ||
						c_group === undefined
							? groups[0]
							: c_group
				}
			})

			const { current_group } = yield select(({ app }) => app)

			if (!current_group) return

			yield put({
				type: 'index/query',
				payload: { current_group }
			})
		},
		*deleteGroup ({ payload }, { call, put }) {
			const { group, message_success, message_failed } = payload
			const res = yield call(Service_deleteGroup, group)

			if (res) {
				message.success(message_success)
			} else {
				message.error(message_failed)
			}

			yield put({ type: 'app/query' })
		}
	},

	reducers: {
		updateState (state, { payload }) {
			return {
				...state,
				...payload
			}
		}
	}
}
