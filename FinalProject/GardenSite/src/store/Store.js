import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
// import { UpdateTxtFile } from '../assets/JS/AppScript.js';

// unfortunatly I cant really save stuff perminently as that would require using a server and fetching from databases,
// I don't think that's relevant to the module and i dont want to waste time so everything is currently server side.

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
            state.ForumReplies[Pid].Replies.push("" + Rid);
            // trying to save to local file, doesnt want to work so come back to it
            // const tmpReply = state.ForumReplies.find(a => a.ID == state.ForumReplies[Pid].Replies.at(-1).ID);

            // UpdateTxtFile("../textFiles/ForumReplies.txt",
            //     (tmpReply.ID + "," + tmpReply.Comment + "," + "[" + tmpReply.Replies.join(",") + "]"))
        },
        UpdatePost(state, { Pid, Rid }) {
            state.ForumPosts[Pid].Replies.push("" + Rid);
            // const tmpPost = state.ForumPosts[Pid];

            // UpdateTxtFile("../textFiles/ForumPosts.txt",
            //     (tmpPost.Comment + "," + tmpPost.Tags.join('.') + "," + "[" + tmpPost.Replies.join(",") + "]"));
        }
    },
}

// data for plants although plan stores a copy
const plants = {
    namespaced: true,
    state() {
        return { Plants: [] }
    },
    mutations: {
        AddPlant(state, { name, color, instructions }) {
            state.Plants.push({ Name: name, Color: color, Instructions: instructions });
        },
    },
    getters: {
        PlantByName: (state) => (name) => {
            return state.Plants.find(e => e.Name == name);
        },
    }
}

// for data that is ascosiated with users (login getting token, stored plans or journals)
const userData = {
    namespaced: true,
    state() {
        return {
            User: [],
            PlantPlan: [],
            PlantJournal: []
        }
    },
    mutations: {
        // Init
        AddUser(state, { username, password, plans, journal, active }) {
            state.User.push({ Username: username, Password: password, Plans: plans, Journal: journal, Active: active })
        },
        AddPlan(state, { id, name, plants }) {
            state.PlantPlan.push({ ID: id, Name: name, Plants: plants })
        },
        // conPlan is for connecting to a plan can be "" if its a val, it is id of Plan and name = ""
        AddJournal(state, { id, name, instructions, conPlan }) {
            state.PlantJournal.push({ ID: id, Name: name, Instructions: instructions, ConPlan: conPlan })
        },

        // Updating Lists
        UpdateUserJournal(state, { username, journalId }) {
            if (state.User[state.User.findIndex(e => e.Username == username)].Journal == undefined)
                state.User[state.User.findIndex(e => e.Username == username)].Journal = [journalId];
            else
                state.User[state.User.findIndex(e => e.Username == username)].Journal.push(journalId);
        },

        UpdateUserPlan(state, { username, planId }) {
            if (state.User[state.User.findIndex(e => e.Username == username)].Plans == undefined)
                state.User[state.User.findIndex(e => e.Username == username)].Plans = [planId];
            else
                state.User[state.User.findIndex(e => e.Username == username)].Plans.push(planId);
        },

        // saving / updating list entries
        SaveUserPlan(state, { plan, id }) {
            state.PlantPlan[state.PlantPlan.findIndex(e => e.ID == id)] = plan;
        },
    },
    getters: {
        GetUserData: (state) => (username) => {
            var tmp = state.User.find(e => e.Username == username);
            return (tmp == undefined) ? undefined : { Plans: tmp.Plans, Journals: tmp.Journal, Active: tmp.Active }
        },
        GetPlanByID: (state) => (id) => {
            return state.PlantPlan.find(e => e.ID == id)
        },
        GetJournalByID: (state) => (id) => {
            return state.PlantJournal.find(e => e.ID == id)
        },
    },
}

// for small bits of session to session data (login token, entered Usernam, PAth)
const AuthStuff = {
    namespaced: true,
    state() {
        return { AuthKey: "", Username: "", path: "", BigWindow: true }
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
        IsBig(state, n) {
            state.BigWindow = n;
        }

    },
}

const dataState = createPersistedState({
    paths: ['Auth', 'UserData'],
    storage: window.sessionStorage,
})

const store = createStore({
    modules: {
        Auth: AuthStuff,
        Posts: Post,
        UserData: userData,
        Plants: plants
    },
    plugins: [dataState]

})



export default store