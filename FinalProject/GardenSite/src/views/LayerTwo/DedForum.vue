<script setup>
// allows detection of click outside on the search box
import { OnClickOutside } from "@vueuse/components";
</script>

<template>
  <OnClickOutside
      v-on:keyup.escape = "ExSearch = false; SearchTran();"
    @trigger="
      ExSearch = false;
      SearchTran();
    "
  >
    <!-- this button will show / hide the expanded search component -->
    <button
      :class="SearchClass"
      @click="
        ExSearch = true;
        SearchTran();
      "
    >
      <SearchExpanded ref="searchBox" :PlaceHold="searchText" v-if="ExSearch"></SearchExpanded>
      <!-- as it was just a header, there was no harm keeping it rendered with v-show-->
      <h2 v-show="!ExSearch && searchText != ''">{{ searchText }}</h2>
      <h2 v-show="!ExSearch && searchText == ''">Search</h2>
    </button>
  </OnClickOutside>

  <div style="background-color: #ceb7de40">
    <h3>Posts</h3>
    <ForumMes
      v-for="post in this.Posts"
      :title="post.Title"
      :text="post.Text"
      :tags="post.Tags"
      :key="post.id"
    >
    </ForumMes>
  </div>
</template>

<script>
import SearchExpanded from "../../components/SearchExpanded.vue";
import ForumMes from "../../components/ForumPost.vue";

export default {
  data() {
    return {
      ExSearch: false,
      SearchClass: "SearchButton",
      searchText: this.$route.query.search || "",
      searchtags: [],
    };
  },
  components: { SearchExpanded, ForumMes },

// the expanded search passes values through the URl so i set up a watcher to check when that gets updated
  watch: {
    "$route.query.search"() {
      this.searchText = this.$route.query.search || "";
      this.ExSearch = false;
      this.SearchTran();
    },
  },

  computed: {
    // this is the filtering for the search function
    Posts() {
      var FilteredPosts = this.$store.state.Posts.ForumPosts;
      if (this.searchText != "") {
        FilteredPosts = FilteredPosts.filter(
          (post) =>
            post.Title.toLowerCase().indexOf(this.searchText.toLowerCase()) !=
              -1 ||
            post.Text.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1
        );
      }

      return FilteredPosts;
    },
  },

  methods: {
    SearchTran() {
      if (this.ExSearch) {
        this.SearchClass = "EmptySearch";
        // need to wait for it to exist before triggereing focus event
        this.$nextTick(function () {
          this.$refs.searchBox.FocusText();
        });
      } else {
        this.SearchClass = "SearchButton";
      }
    },
  },
};
</script>

<style scoped>
@import "../../assets/styles/ForumStyles.css";
</style>
