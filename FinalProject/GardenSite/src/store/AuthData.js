import { createStore } from 'vuex'


const store = createStore({
    state() {
        return { AuthKey: "temp", }
    },
    mutations: {
        Replace(state, n) {
            state.AuthKey = n;
        }
    }

})

export default store