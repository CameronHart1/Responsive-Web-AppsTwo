<template>
  <div>
    <h1>something</h1>
  </div>
  <body>
    <div class="EntryPage" id="bigdiv">
      <h1>Lots of really important text</h1>
      <p id="overw">hbdsgbahjbfgabgfkjfgh</p>
      <ToDoList></ToDoList>
    </div>
  </body>

  <button
    class="but"
    style="height: 200px; margin-left: 40%"
    onclick=" 
    var tempp = document.getElementById('bigdiv');
    if(tempp.style.backgroundColor == 'white')
     {tempp.style.backgroundColor = 'aquamarine'}
    else
     {tempp.style.backgroundColor = 'white'}
    "
  >
    toggle background
  </button>
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


