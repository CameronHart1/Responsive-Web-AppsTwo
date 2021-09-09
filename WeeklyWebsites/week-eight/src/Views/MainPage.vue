<template>
  <h1 style="margin-top: 0">something</h1>
  <div class="EntryPage" id="bigdiv">
    <h1>Lots of really important text</h1>
    <p id="overw">A subheading</p>

    <ToDoList @clicked="CheckListUpdated">
       <p>To Do List</p>
       <template v-slot:HeadingSlot>
       <h3>last list activity</h3>
       </template>
    </ToDoList>
    
    <div>
      <p> {{LastChange}} </p>
    </div>
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
    ToDoList,
    TagList,
  },
  data() {
    return {
      LastChange:"None",
    };
  },
  methods: {
    CheckListUpdated(Message) {
      this.LastChange = Message;
    },
  },
};
</script>

<style scoped src= '..\components\stylemainM.css'></style>