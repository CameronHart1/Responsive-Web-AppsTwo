<template>
  <div id="app">
    <!-- this header will always be accesible -->
    <div id="HeaderBack">
      <!-- the little logo in the left -->
      <img
        src="./assets/Images/GardenIcon.svg"
        style="width: 50px; height: 50px; left: 0; position: absolute; cursor: pointer;"
        @mousedown="imgClick"
      >
      <div class="HeaderShadow">
        <!-- the "page" navigation -->
        <div class="FlexHeader">
          <router-link to="/profile">Profile</router-link>
          <router-link to="/about">About</router-link>
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

export default {
  name: "App",
 methods:{
  //  this function runs when we click the image
   imgClick(){
     router.push("/profile");
   }
 }
};

</script>

<style>
@import "./assets/styles/Style.css";
</style>

