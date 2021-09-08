<template>
  <div id="ListTest">
    <slot>That List</slot>
    <ul style="width: 100px">
      <li v-for="todo in todos" v-bind:key="todo.id">
        <input type="Checkbox" :value="todo.val" class="striked" @click="CheckedItem($event)">
        <span>
          {{ todo.text }}
        </span>
      </li>
    </ul>
    <div style="text-align:center">
    <slot name="HeadingSlot"></slot>
    </div>
  </div>
</template>

<script>
export default {
  // giving the array default values
  props: {
    todos: {
      type: Array,
      default() {
        return [
          { val: "one", text: "This" },
          { val: "two", text: "That" },
        ];
      },
    },
  },
  methods: {
    CheckedItem(event) {
      if (event.target.checked) {
        this.$emit("clicked","Item with Value: " + event.target.value + ", was checked");
      } else {
        this.$emit("clicked","Item with Value: " + event.target.value + ", was unchecked");
      }
    },
  },
};
</script>

<style scoped src= '.\stylemainM.css'>
</style>