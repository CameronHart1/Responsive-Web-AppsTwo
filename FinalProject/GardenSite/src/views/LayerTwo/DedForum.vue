<script setup>
// allows detection of click outside on the search box
import { OnClickOutside } from "@vueuse/components";
</script>

<template>

<OnClickOutside
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
      <SearchExpanded ref="searchBox" v-if="ExSearch"></SearchExpanded>
      <h2 v-show="!ExSearch">Search</h2>
    </button>
  </OnClickOutside>

    <div style="background-color: #CEB7DE40;">
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
      Posts: this.$store.state.Posts.ForumPosts,
    };
  },
  components: { SearchExpanded, ForumMes },

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
