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
        FocusTextBox();
        SearchTran();
      "
    >
      <h2 v-show="!ExSearch">Search</h2>
      <SearchExpanded ref="searchBox" v-show="ExSearch"></SearchExpanded>
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

<!-- the box that manages the three forum columns, might be able to convert to its own components,
 although that might make passing probs harder (passing arrays of objects) maybe not works now though -->
  <div id="ForumPosts">

    <div id="MyForums">
      <h3>My Forums</h3>
      <ForumMes
        v-for="post in MyP"
        :title="post.title"
        :text="post.text"
        :key="post.id"
      >
      </ForumMes>
    </div>

    <div id="Feed">
      <h3>Feed</h3>
      <ForumMes
        v-for="post in FeedP"
        :title="post.title"
        :text="post.text"
        :key="post.id"
      >
      </ForumMes>
    </div>

    <div id="Groups">
      <h3>Groups</h3>
      <ForumMes
        v-for="post in GroupP"
        :title="post.title"
        :text="post.text"
        :key="post.id"
      >
      </ForumMes>
    </div>
  </div>
</template>

<script>
import ForumCat from "../components/ForumCatagory.vue";
import { ForumOnToggle } from "../assets/JS/AppScript";
import SearchExpanded from "../components/SearchExpanded.vue";
import ForumMes from "../components/ForumPost.vue";

export default {
  // searching var
  // current class of search bar
  //lists of objects for forum posts
  data() {
    return {
      ExSearch: false,
      SearchClass: "SearchButton",
      MyP: [
        { title: "example", text: "ExampleText" },
        { title: "example different", text: "ExampleText But unique" },
      ],
      FeedP: [
        { title: "example very wired", text: "ExampleText IDK" },
        { title: "example something different", text: "ExampleText stuff" },
      ],
      GroupP: [
        { title: "example blah", text: "ExampleText blah" },
        { title: " blah example", text: " blah blah ExampleText" },
        { title: " blah blah blah", text: " blah blah Bored Test" },
      ],
    };
  },

  components: { ForumCat, SearchExpanded, ForumMes },
  methods: {
    ForumOnToggle,
    // lets me have a delay from when the class of searchbutton changes
    //  (so I can make it pretty with transitions later)
    SearchTran() {
      if (this.ExSearch) {
        setTimeout(() => (this.SearchClass = "EmptySearch"), 100);
      } else {
        setTimeout(() => (this.SearchClass = "SearchButton"), 100);
      }
    },
    //focusing the textbox when search is clicked
    FocusTextBox() {
      this.$refs.searchBox.FocusText();
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/ForumStyles.css";
</style>