<template>
<!-- currently a bland post that adds the props data in
 need to make prettier later -->
  <div style="min-height: 100px; padding-left: 20px">
      <span  class="ForumP"></span>
    <p>{{ reply.Comment }}</p>
    <CommentBut :parentC="this.parentPost" :parentR="this.reply.ID.split(':')[1]" :CommentReply="true" ></CommentBut>

    <!-- REcusive elemtn for nested replies -->
    <div v-if="replies.length > 0">
    <ForumReply v-for="rep in replies"
    :reply = "this.$store.state.Posts.ForumReplies.find(p => p.ID == parentPost + ':' + rep)"
    :key="rep.id"
    > </ForumReply>
    </div>
  </div>
</template>

<script>
import CommentBut from "./CommentButton.vue";

export default {
  props: {
    reply:{type: Object, require:true, }
  },
  components:{  CommentBut },
  name:'ForumReply',
  data(){
      return {
          replies: this.reply.Replies,
          parentPost: this.reply.ID.split(':')[0],
      }
  },
};
</script>

<style scoped>
 @import '../assets/styles/ForumStyles.css';
</style>