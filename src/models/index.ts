import modelExtend from 'dva-model-extend'
import pageModel from '@/utils/model'

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
		*query ({}, {}) {}
	}
})
