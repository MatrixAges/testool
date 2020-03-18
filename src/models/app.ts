export default {
	namespace: 'app',

	state: {
		fold: false
	},

	subscriptions: {
		setup ({ dispatch }) {
			dispatch({ type: 'query' })
		}
	},

	effects: {
		*query ({}, {}) {}
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
