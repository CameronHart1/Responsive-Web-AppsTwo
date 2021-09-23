<template>
<!-- currently a bland post that adds the props data in
 need to make prettier later -->
  <div style="min-height: 100px">
      <span  class="ForumP"></span>
    <h4>{{ title }}</h4>
    <pre>{{ text }}</pre>
  </div>
  
</template>

<script>
export default {
  props: {
    title: String,
    text: String,
    tags: Array,
  },
};
</script>

<style scoped>
 @import '../assets/styles/ForumStyles.css';
</style>