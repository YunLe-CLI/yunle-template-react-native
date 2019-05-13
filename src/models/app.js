
export default {
    namespace: 'app',
    state: {
       
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {

    },
    subscriptions: {

    },
}
