<template>
  <div style="min-height: 300px">
      <span  class="ForumP"></span>
    <h4>{{ title }}</h4>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    text: String,
  },
};
</script>

<style scoped>
 @import '../assets/styles/ForumStyles.css';
</style>