<template>
  <button class="SearchButton">Search</button>
  <SearchExpanded> </SearchExpanded>

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

  <div id="ForumPosts">
    <div id="MyForums"><h3>My Forums</h3></div>
    <div id="Feed"><h3>Feed</h3></div>
    <div id="Groups"><h3>Groups</h3></div>
  </div>
</template>

<script>
import ForumCat from "../components/ForumCatagory.vue";
import { ForumOnToggle } from "../assets/JS/AppScript";
import SearchExpanded from '../components/SearchExpanded.vue';

export default {
  components: { ForumCat, SearchExpanded },
  methods: {
    ForumOnToggle,
  },
};
</script>

<style scoped>
@import "../assets/styles/ForumStyles.css";
</style>