export default {
	namespace: 'app',

      state: {
		group: [
			{
				name: 'nodejs'
			},
			{
				name: 'javascript'
			},
			{
				name: 'webpack'
                  },
                  {
				name: 'react'
			},
		]
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
