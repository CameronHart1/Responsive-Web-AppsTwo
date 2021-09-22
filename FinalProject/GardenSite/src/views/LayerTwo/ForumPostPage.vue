<template>
  <div style="background-color: #ceb7de20; padding-bottom: 40px">
    <button id="ReturnBut" @click="ReturnFunc">Return</button>
    <ForumMes
      :title="post.Title"
      :text="post.Text"
      :tags="post.Tags"
      :key="post.id"
    ></ForumMes>
  </div>
  <CommentBut :parentC="this.$route.params.PostID" :parentR="this.$route.params.PostID" :CommentReply="false" ></CommentBut>

  <div v-if="replies.length > 0">
    <ForumReply v-for="rep in replies" :reply="rep" :key="rep.id"> </ForumReply>
  </div>
</template>

<script>
import ForumMes from "../../components/ForumPost.vue";
import ForumReply from "../../components/ForumReply.vue";
import router from "../../router/index.js";
import CommentBut from "../../components/CommentButton.vue";
  
export default {
  data() {
    return {
      fromPath: "",
      post: this.$store.state.Posts.ForumPosts[this.$route.params.PostID],
    };
  },
  components: { ForumMes, ForumReply, CommentBut },

  // needed to set replies array to a computed value so it will reflect / watch for chnages in the array and update the v-for
  computed:{
    replies(){
      return this.$store.state.Posts.ForumReplies.filter(
        (rep) => rep.ID.split(":")[0] == this.$route.params.PostID
      )
    }
  },

  // as a backup we store the fullpath in the authkey store, as that is persistent on the users browser (saves through refreshes)
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path != "/" && from.path != "") {
        vm.fromPath = from.fullPath;
        vm.$store.commit("Auth/ReplacePath", from.fullPath);
      }
    });
  },
  methods: {
    ReturnFunc() {
      if(this.fromPath != "")
      {
      router.push(this.fromPath);
      }
      else
      router.push(this.$store.state.Auth.path)
    },
  },
};
</script>
