<template>
<!-- component for the forum type buttons -->
  <label class="ForumBoxSwitch">
    <input type="checkbox" v-bind:name="forumName" v-bind:value="forumValue" checked  @input="$emit('toggle',$event.target.value)">
    <span class="ToggleButton">{{ forumTitle }} </span>
  </label>
</template>

<script>


export default 
{
    props:{forumName:String,
    forumValue:String,
    forumTitle:String,
    },
    emits:['toggle'],

};

</script>

<style scoped>
 @import '../assets/styles/ForumStyles.css';
</style>