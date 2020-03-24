import { history } from 'umi'
import { message } from 'antd'
import store from 'store'
import { Service_getAllGroups } from '@/services/index'
import { Service_deleteGroup } from '@/services/app'

export default {
	namespace: 'app',

	state: {
		groups: [],
		current_group: ''
	},

	subscriptions: {
		setup ({ dispatch }) {
			dispatch({ type: 'query' })
		}
	},

	effects: {
		*query ({}, { call, put }) {
			const groups = yield call(Service_getAllGroups)

			if (groups.length === 0) {
				store.set('current_group', null)
			}

                  const c_group = store.get('current_group')
                  
                  console.log(groups);

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

			if (groups.length === 0 && store.get('init')) {
				history.go(0)

				store.set('init', false)
			} else {
				store.set('init', true)
			}
		},
		*deleteGroup ({ payload }, { call }) {
			const { group, message_success, message_failed } = payload
			const res = yield call(Service_deleteGroup, group)

			if (res) {
				message.success(message_success)
			} else {
				message.error(message_failed)
                  }
                  
                  history.go(0)
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
