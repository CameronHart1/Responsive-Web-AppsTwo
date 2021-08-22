<template>
  <div id="app">
    <div id="header">
      <h1>Main Title</h1>
      <div class="FlexHeader">
        <router-link to="/">Go to Home</router-link>
        <router-link to="/about">Go to About</router-link>
      </div>
    </div>
    <body>
      <router-view></router-view>
    </body>
  </div>
</template>



<script>
export default {
  name: "Mapp",
};
</script>


<style scoped src= '.\components\stylemainM.css'></style>


