<template>
  <div>
    <h1>something</h1>
  </div>

  <div class="EntryPage">
    <h1>Lots of really important text</h1>
    <p>hbdsgbahjbfgabgfkjfgh</p>
    <ToDoList></ToDoList>
  </div>
</template>



<script>
import ToDoList from "./components/ToDoList.vue";

export default {
  name: "MainM",
  components: {
    ToDoList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src= '.\components\stylemainM.css'></style>


