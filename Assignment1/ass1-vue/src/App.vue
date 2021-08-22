<template>
<div id="app">
    <div id="header">
      <div class="FlexHeader">
        <router-link to="/home">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <body>
      <router-view></router-view>
    </body>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import './assets/styles/Big.css';
</style>

