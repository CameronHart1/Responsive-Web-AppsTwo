

<template>
  <LandSwitch @click="LS()"></LandSwitch>
  <router-view></router-view>
</template>

<script>
import LandSwitch from "../components/LandingSwitch.vue";
import router from '../router/index.js'

export default {
  name: "Landing",
  methods: {
    LS() {
        var ob = document.getElementById("LandingSwitch")
      if (ob.checked == true) {
        router.replace({name:"garden"});
      } else {
        router.replace({name:"social"});
      }
    },
  },
  components: {
    LandSwitch,
  },
};
</script>

<style scoped>
@import "../assets/styles/LandingSlider.css";
</style>
