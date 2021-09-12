import { createStore } from 'vuex'


const store = createStore({
    state() {
        return { AuthKey: "", Username: "" }
    },
    mutations: {
        ReplaceKey(state, n) {
            state.AuthKey = n;
        },
        ReplaceUser(state, n) {
            state.Username = n;
        },
    }

})

export default store