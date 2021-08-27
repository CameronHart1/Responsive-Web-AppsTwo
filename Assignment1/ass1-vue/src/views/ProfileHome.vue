

<template>
  <LandSwitch @click="LS()"></LandSwitch>
  <div class="MainLayout">
    <router-view></router-view>
  </div>
</template>

<script>
import LandSwitch from "../components/Pswitch.vue";
import router from "../router/index.js";

export default {
  name: "Profile",
  methods: {
    LS() {
      var ob = document.getElementById("LandingSwitch");
      if (ob.checked == true) {
        router.replace({ name: "garden" });
      } else {
        router.replace({ name: "social" });
      }
    },
  },
  
  components: {
    LandSwitch,
  },
};
</script>

<style scoped>
@import "../assets/styles/Pslider.css";
</style>
