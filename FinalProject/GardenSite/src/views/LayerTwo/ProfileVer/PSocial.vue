<script setup>
// allows detection of click outside on the search box
import { OnClickOutside } from "@vueuse/components";
</script>

<template>
  <!-- The Profile social page -->

  <!-- THis is a wrapper for the search bar that detects when the user clicks out of it -->
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

  <!-- THe three buttons that control what threads are shown -->
  <div class="ForumBox">
    <ForumCat
      forum-title="My Forums"
      forum-name="Forum"
      forum-value="MyForum"
      v-on:toggle="ForumOnToggle"
    ></ForumCat>
    <ForumCat
      forum-title="Feed"
      forum-name="Forum"
      forum-value="Feed"
      v-on:toggle="ForumOnToggle"
    ></ForumCat>
    <ForumCat
      forum-title="Groups"
      forum-name="Forum"
      forum-value="Groups"
      v-on:toggle="ForumOnToggle"
    ></ForumCat>
  </div>

  <!-- the box that manages the three forum columns, uses the filtered computed properties-->
  <div id="ForumPosts">
    <div id="MyForums">
      <h3>My Forums</h3>
      <ForumMes
        v-for="post in MyP"
        :title="post.Title"
        :text="post.Text"
        :tags="post.Tags"
        :key="post.id"
      >
      </ForumMes>
    </div>

    <div id="Feed">
      <h3>Feed</h3>
      <ForumMes
        v-for="post in FeedP"
        :title="post.Title"
        :text="post.Text"
        :tags="post.Tags"
        :key="post.id"
      >
      </ForumMes>
    </div>

    <div id="Groups">
      <h3>Groups</h3>
      <ForumMes
        v-for="post in GroupP"
        :title="post.Title"
        :text="post.Text"
        :tags="post.Tags"
        :key="post.id"
      >
      </ForumMes>
    </div>
  </div>
</template>

<script>
import ForumCat from "../../../components/ForumCatagory.vue";
import { ForumOnToggle } from "../../../assets/JS/AppScript";
import SearchExpanded from "../../../components/SearchExpanded.vue";
import ForumMes from "../../../components/ForumPost.vue";

export default {
  // searching var
  // current class of search bar
  data() {
    return {
      ExSearch: false,
      SearchClass: "SearchButton",
      Posts: this.$store.state.Posts.ForumPosts,
    };
  },

// filtering the posts into the sections
  computed: {
    MyP: function () {
      return this.Posts.filter((a) => a.Tags.includes("My"));
    },
    FeedP: function () {
      return this.Posts.filter((a) => a.Tags.includes("Feed"));
    },
    GroupP: function () {
      return this.Posts.filter((a) => a.Tags.includes("Group"));
    },
  },

  components: { ForumCat, SearchExpanded, ForumMes },
  methods: {
    ForumOnToggle,
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
@import "../../../assets/styles/ForumStyles.css";
</style>