import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
// import { UpdateTxtFile } from '../assets/JS/AppScript.js';

// using modules in the store, can be accesed via this.$store.state.Posts (or.Auth)
// in commits it's like a path so for state it "Posts/AddPost"
// for global storgae of everything
const Post = {
    namespaced: true,
    state() {
        return { ForumPosts: [], ForumReplies: [], count: 0 }
    },
    mutations: {
        AddPost(state, { t, tt, ttt, Reply }) {
            state.ForumPosts.push({ ID: state.count, Title: t, Text: tt, Tags: ttt, Replies: Reply });
            // state.count += 1;
            state.count++;
        },
        AddReply(state, { id, comment, replies }) {
            state.ForumReplies.push({ ID: id, Comment: comment, Replies: replies });
        },

        // Parent id and Reply id, updaeing the stored vals and adding to.TXT file
        UpdateReply(state, { Pid, Rid }) {
            console.log("Reply Tr4ig")
            state.ForumReplies[Pid].Replies.push("" + Rid);
            // trying to save to local file, doesnt want to work so come back to it
            // const tmpReply = state.ForumReplies.find(a => a.ID == state.ForumReplies[Pid].Replies.at(-1).ID);

            // UpdateTxtFile("../textFiles/ForumReplies.txt",
            //     (tmpReply.ID + "," + tmpReply.Comment + "," + "[" + tmpReply.Replies.join(",") + "]"))
        },
        UpdatePost(state, { Pid, Rid }) {
            console.log("post Tr4ig")
            state.ForumPosts[Pid].Replies.push("" + Rid);
            // const tmpPost = state.ForumPosts[Pid];

            // UpdateTxtFile("../textFiles/ForumPosts.txt",
            //     (tmpPost.Comment + "," + tmpPost.Tags.join('.') + "," + "[" + tmpPost.Replies.join(",") + "]"));
        }
    },
}

const AuthStuff = {
    namespaced: true,
    state() {
        return { AuthKey: "", Username: "", path: "" }
    },
    mutations: {
        ReplaceKey(state, n) {
            state.AuthKey = n;
        },
        ReplaceUser(state, n) {
            state.Username = n;
        },
        ReplacePath(state, n) {
            state.path = n;
        },
    },
}

const dataState = createPersistedState({
    paths: ['Auth'],
    storage: window.sessionStorage,
})

const store = createStore({
    modules: {
        Auth: AuthStuff,
        Posts: Post,
    },
    plugins: [dataState]

})



export default store