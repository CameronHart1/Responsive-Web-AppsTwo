<script setup>
// allows detection of click outside on the Comment Box
import { OnClickOutside } from "@vueuse/components";
</script>

<template>
  <OnClickOutside
    v-on:keyup.escape="ExSearch = false"
    @trigger="
      CommentBox = false;
    "
  >
    <!-- this button will show / hide the expanded text area component -->
    <!-- should turn into text editor, so can reuse for post -->
    <button class="CommentClass" v-if="!CommentBox" @click="CommentBox = true">
      reply
    </button>
    <div v-if="CommentBox">
      <!-- exact only triggers on enter (so not shift enter) -->
      <textarea
        id="CommentTextBox"
        placeholder="Type here"
        v-model="Comment"
        v-on:keyup.enter.exact="confirmReply"
      />
    </div>
  </OnClickOutside>
</template>

<script>
export default {
  props: {
    // Parent Comment
    parentC: {
      type: String,
      required: true,
    },
    // Parent Reply 
    parentR: {
      type: String,
      required: true,
    },
    // if this is a reply to the OP (original post) or a reply
    CommentReply:{
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      CommentBox: false,
      Comment: "",
    };
  },
  methods: {
    //   commitng the reply to the dB
    confirmReply() {
    const RepNum = this.$store.state.Posts.ForumReplies.length;
    // adding reply to store
      this.$store.commit("Posts/AddReply", {
        id: (this.parentC + ":" + RepNum),
        comment: this.Comment,
        replies: [],
      });
// updating the comment or reply with relevent id
      if(this.CommentReply)
      {this.$store.commit("Posts/UpdateReply",{Pid:this.parentR,Rid:RepNum})}
      else
      {this.$store.commit("Posts/UpdatePost",{Pid:this.parentC,Rid:RepNum})}
   
      this.CommentBox = false;
    },
  },
};
</script>