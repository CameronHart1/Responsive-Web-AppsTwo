import { createStore } from 'vuex'

// using modules in the store, can be accesed via this.$store.state.Posts (or.Auth)
// in commits it's like a path so for state it "Posts/AddPost"
// for global storgae of everything
const Post = {
    namespaced: true,
    state() {
        return { ForumPosts: [] }
    },
    mutations: {
        AddPost(state, { t, tt, ttt }) {
            // state.ForumPosts[state.count].Title = t;
            // state.ForumPosts[state.count].Text = tt;
            // state.ForumPosts[state.count].Tags = ttt;
            // state.count += 1;
            state.ForumPosts.push({ Title: t, Text: tt, Tags: ttt });
        },
    }
}

const AuthStuff = {
    namespaced: true,
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
    },
}

const store = createStore({
    modules: {
        Auth: AuthStuff,
        Posts: Post,
    }

})



export default store