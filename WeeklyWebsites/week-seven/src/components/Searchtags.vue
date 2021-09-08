<template>
  <div id="ListTest">
    <label>That List</label>
    <div v-for="tag in plants" :key ="tag.id">
        <input
          type ="checkbox"
          v-model.lazy ="Seltags"
          :value = tag.text
          class ="striked"
        /><label :for=  tag.text >{{tag.text}}</label>
    </div>

    <p>Checked Tags: {{ Seltags }}</p>
  </div>
</template>

<script>
export default {
  name: "SearchTags",
  el: '#app',
  data(){
      return {
          plants:[{text: "Flower"},{text: "Shrub"},{text: "Tree"}],
          Seltags: []
      }
  }
};
</script>

<style scoped src= '.\stylemainM.css'>
</style>