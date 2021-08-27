<template>
  <div class="SearchBox">
    <input type="text" id="SearchText" placeholder="Search" />
    <div id="filters">
      <p>example filter</p>
      <p>example filter</p>
      <p>example filter</p>
      <p>example filter</p>
      <p>example filter</p>
      <p>example filter</p>
      <p>example filter</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    FocusText() {
      //   need to wait for next tick as obj is unhiding itself
      this.$nextTick(() => {
        document.getElementById("SearchText").focus();
      });
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/ExpandedSearch.css";
</style>