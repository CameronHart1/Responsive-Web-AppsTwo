<template>
  <div id="app">
    <div id="HeaderBack">
      <img src="./assets/Images/GardenIcon.svg"  style="width:50px; height:50px; left:0; position:absolute;">
      <div :class="scrolled ? 'HeaderShadow' : ''">
      <div class="FlexHeader">
        <router-link to="/home">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
      </div>
    </div>
    <body id="appBod">
      <router-view></router-view>
    </body>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      scrolled: false,
    };
  },

  methods: {
    HeaderScroll() {
      this.scrolled = window.scrollY > 0;
    },
  },

  created() {
    window.addEventListener("scroll", this.HeaderScroll);
  },
};
</script>

<style>
@import "./assets/styles/Big.css";
</style>

