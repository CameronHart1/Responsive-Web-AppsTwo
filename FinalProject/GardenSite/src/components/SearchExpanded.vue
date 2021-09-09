<template>
  <!-- the component for the expanded search bar, the paragraphs will be replaced by ceratin filters
will need a flexbox, with one element bing a form of variable filters that change depending on search type -->
  <div class="SearchBox" id="SearchBoxId">
    <input type="text" ref="Search" id="SearchText" placeholder="Search" />
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
      //   when unhiden fires focus event
        this.$refs.Search.focus()
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/ExpandedSearch.css";
</style>