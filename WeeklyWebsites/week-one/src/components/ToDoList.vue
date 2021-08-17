<script>
export default {
  data() {
    return {
      todos: [
        { val: "one", text: "This" },
        { val: "two", text: "That" },
      ],
    };
  },
};
</script>


<template>
  <div id="ListTest">
    <label>That List</label>
    <ul>
      <li v-for="todo in todos" v-bind:key="todo.id">
        <input type="Checkbox" value="{{todo.val}}" class="striked" /><span>
          {{ todo.text }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.striked:checked + span{
  text-decoration: line-through;
}
</style>