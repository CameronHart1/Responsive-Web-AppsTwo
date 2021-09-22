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
    <button class="CommentClass" v-if="!CommentBox" @click="CommentBox = true">
      reply
    </button>
    <div v-if="CommentBox">
      <input
        type="text"
        id="CommentTextBox"
        placeholder="Type here"
        v-model="Comment"
        v-on:keyup.enter="confirmReply"
      />
    </div>
  </OnClickOutside>
</template>

<script>
export default {
  props: {
    parentC: {
      type: String,
      required: true,
    },
    parentR: {
      type: String,
      required: true,
    },
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