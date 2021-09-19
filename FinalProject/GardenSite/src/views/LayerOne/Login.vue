<template>
  <div>
    <input
      type="text"
      name="Username"
      v-model="username"
      placeholder="Username"
    />
    <input
      type="password"
      name="Password"
      v-model="password"
      placeholder="Password"
    />
  </div>
  <div>
    <button id="LoginBut" v-on:click="CheckAuth()">Login</button>
  </div>
</template>

<script>
import store from "../../store/Store.js";
import router from "../../router/index.js";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  emits: ["auth"],

  methods: {
    CheckAuth() {
      // if the succesfully login they get an auth user
      if (this.username != "" && this.password != "") {
        store.commit("Auth/ReplaceKey", this.username.split("").reverse().join(""));
        store.commit("Auth/ReplaceUser", this.username);
        const redirectPath = this.$route.query.redirect || 'profile';
        router.push({ name: redirectPath, params: { username: this.username } });
      }
      // so the serve will assign unique authUser to logged in pc,
      // when accessing new / different users the server checks if the authUser is authorized
      // to view that profile (so we can view public profiles but not edit stuff)
    },
  },
};
</script>