<template>
  <div id="ListTest">
    <label>That List</label>
    <div v-for="tag in plants" :key="tag.id">
      <input
        type="checkbox"
        v-model.lazy="Seltags"
        :value="tag.text"
        class="striked"
        @click="this.LogChecklist($event)"
      /><label :for="tag.text">{{ tag.text }}</label>
    </div>

    <p>Checked Tags: {{ Seltags }}</p>
  </div>
</template>

<script>
import mix from "../mixin/ChecklistMixin.js";

export default {
  mixins: [mix],
  name: "SearchTags",
  data() {
    return {
      plants: [{ text: "Flower" }, { text: "Shrub" }, { text: "Tree" }],
      Seltags: [],
    };
  },
};
</script>

<style scoped src= '.\stylemainM.css'>
</style>