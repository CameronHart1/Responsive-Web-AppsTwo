<template>
  <div class="Main">
    <h1> This is a test </h1><br>
    <a href = "#anchor"> the anchor </a>
    <h2> Another Test</h2>
    <h3> blah blah blah</h3>
    <a name = "anchor"> the anch </a><br>
    <ol>
        <li> One </li>
        <li> Two </li>
        <li> Three </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Main",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>