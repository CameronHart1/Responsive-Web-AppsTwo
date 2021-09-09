<template>
  <div id="app">
    <div id="header">
      <h1 :title="message">Main Title</h1>
      <div class="FlexHeader">
        <router-link to="/">Go to Home</router-link>
        <router-link to="/about">Go to About</router-link>
      </div>
    </div>
    <body>
      <router-view v-if="!hidden"></router-view>
      <p v-else> This normal stuff is hidden (duuh)
        this is just the v-else
      </p>
      <h2 v-show="hidden"> this is always rendered, you just cant always see it </h2>
    </body>
  </div>
</template>



<script>
export default {
  name: "Mapp",
  data() {
    return {
      message: "an example of declariative rendering?",
      hidden: false
    }
  },
};
</script>


<style scoped src= '.\components\stylemainM.css'></style>


