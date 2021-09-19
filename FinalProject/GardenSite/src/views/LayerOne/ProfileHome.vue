

<template>
  <!-- this is the main profile page, with the switch that controls if the social or gardening profile view is active -->
  <LandSwitch v-if="LoadSwitch" @click="LS()"></LandSwitch>
  <div class="MainLayout">
    <router-view></router-view>
  </div>
</template>

<script>
import router from "../../router/index.js";
import LandSwitch from "../../components/Pswitch.vue";

export default {
  name: "Profile",
  data() {
    return {
      LoadSwitch: true,
    };
  },

  emits: [],
  // on entering page / ropute changing (different to refresh)
  beforeRouteUpdate(to, from, next) {
    this.checkslider(to.name);
    next();
  },
  // on refresh
  mounted() {
    this.checkslider(this.$route.name);
  },
  methods: {
    // mehtod for checkming if slider is needed
    checkslider(ToCheck) {
      if (ToCheck == "garden" || ToCheck == "social") {
        this.LoadSwitch = true;
      } else {
        this.LoadSwitch = false;
      }
    },

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
@import "../../assets/styles/Pslider.css";
</style>
