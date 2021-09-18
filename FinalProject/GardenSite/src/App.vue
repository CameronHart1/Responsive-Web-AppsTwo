<template>
  <div id="app">
    <!-- this header will always be accesible -->
    <div id="HeaderBack">
      <!-- the little logo in the left -->
      <img
        src="./assets/Images/GardenIcon.svg"
        style="
          width: 50px;
          height: 50px;
          left: 0;
          position: absolute;
          cursor: pointer;
        "
        @mousedown="imgClick"
      />
      <div class="HeaderShadow">
        <!-- the "page" navigation -->
        <div class="FlexHeader">
          <router-link class="navItem" to="/home">Home</router-link>
          <router-link class="navItem" to="/about">About</router-link>
          <!-- to dedicated pages -->

          <!-- if not logged in, login will  -->
          <router-link class="navItem" v-if="!login" to="/login"
            >Login</router-link
          >
          <template v-else>
            <router-link
              class="navItem"
              :to="{ name: 'forum', params: { username: this.Username } }"
            >
              Forum
            </router-link>
            <!-- will be a dropdwon bar -->
            <div class="dropdown">
              <button class="dropButt">Garden Tools</button>
              <div class="dropdownContent">
                <router-link
                  class="dropItem"
                  :to="{
                    name: 'gardenJournal',
                    params: { username: this.Username },
                  }"
                >
                  Journal
                </router-link>
                <router-link
                  class="dropItem"
                  :to="{
                    name: 'gardenPlan',
                    params: { username: this.Username },
                  }"
                >
                  Garden Planner
                </router-link>
              </div>
            </div>

            <router-link
              class="navItem"
              :to="{ name: 'profile', params: { username: this.Username } }"
              >Profile</router-link
            >
          </template>
        </div>
      </div>
    </div>

    <body id="appBod">
      <!-- this is where we switch between our views, as the header will always be visisble and the footer will be at the bottom -->
      <router-view></router-view>
    </body>
    <div id="botStuff"></div>
  </div>
</template>

<script>
import router from "./router/index.js";
import store from "./store/Store.js";
import data from "raw-loader!./assets/textFiles/ForumPosts.txt";

export default {
  name: "App",
  mounted() {
    function DeSerialForum(txt) {
      var lineArray = txt.split('\n');
      var output = [];
      for (var i = 0; i < lineArray.length; i++) {
        var data = lineArray[i].slice(0,-1).split(',');
        output.push(data);
      }

      return output;
    }
// ideally the store already has this information from server, but not hosting on server so we are just running this when we mount app

    var ToStore = DeSerialForum(data);
    for (var i = 0; i < ToStore.length; i++) {
      this.$store.commit(
        "Posts/AddPost",
        {'t':ToStore[i][0],
        'tt':ToStore[i][1],
        'ttt':ToStore[i][2].split('.'),}
      );
    }
  },

  computed: {
    Username() {
      return store.state.Auth.Username;
    },
    login() {
      return store.state.Auth.AuthKey != "" ? true : false;
    },
  },

  methods: {
    //  this function runs when we click the image
    imgClick() {
      router.push("/");
    },
  },
  // checking if user is logged in
};
</script>

<style>
@import "./assets/styles/Style.css";
@import "./assets/styles/NavHeader.css";
</style>

