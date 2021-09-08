<template>
  <h1 style="margin-top:0;">something</h1>
  <div class="EntryPage" id="bigdiv">
    <h1>Lots of really important text</h1>
    <p id="overw">hbdsgbahjbfgabgfkjfgh</p>
    <ToDoList ></ToDoList>
    <TagList></TagList>
  </div>

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
import ToDoList from "../components/ToDoList.vue";
import TagList from "../components/Searchtags.vue";


export default {
  name: "MainPage",
  components: {
    ToDoList,TagList
  },
};
</script>

<style scoped src= '..\components\stylemainM.css'></style>