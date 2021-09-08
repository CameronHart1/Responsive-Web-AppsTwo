<template>
  <div id="ListTest">
    <label>That List</label>
    <ul style="width: 100px">
      <li v-for="todo in todos" v-bind:key="todo.id">
        <input type="Checkbox" value="{{todo.val}}" class="striked" /><span>
          {{ todo.text }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
  todos: {
    type:Array,
    default() {
    return [{ val: "one", text: "This" },{ val: "two", text: "That" }]
    }
    }
  },
};
</script>

<style scoped src= '.\stylemainM.css'>
</style>