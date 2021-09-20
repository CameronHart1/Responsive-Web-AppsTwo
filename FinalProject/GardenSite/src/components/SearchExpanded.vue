<template>
  <!-- the component for the expanded search bar, the paragraphs will be replaced by ceratin filters
will need a flexbox, with one element bing a form of variable filters that change depending on search type -->
  <img
    src="../assets/Images/SearchMag.svg"
    id="SearchImg"
    @mousedown="SearchConfirm"
  />
  <div class="SearchBox" id="SearchBoxId">
    <input
      type="text"
      ref="Search"
      id="SearchText"
      :placeholder="PlaceHold ? PlaceHold : 'Search'"
      v-model="SearchQuery"
      v-on:keyup.enter="SearchConfirm"
    />
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
import router from "../router/index.js";

export default {
  props: {
    PlaceHold: {
      type: String,
    },
  },

  data() {
    return {
      SearchQuery: "",
    };
  },
  methods: {
    FocusText() {
      //   when unhiden fires focus event
      this.$refs.Search.focus();
    },
    // triggered when search button hit (or on enter) update path query or sends us to the forum page with search as query 
    SearchConfirm() {
      if (this.$route.name != "forum" && this.SearchQuery != "") {
        router.push({ name: "forum", query: { search: this.SearchQuery } });
      } else if(this.SearchQuery != ""){
        router.replace({ name: "forum", query: { search: this.SearchQuery } });
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/ExpandedSearch.css";
</style>