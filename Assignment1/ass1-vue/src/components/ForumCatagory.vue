<template>
  <label class="ForumBoxSwitch" onchange="ForumFilterChanged()">
    <input type="checkbox" name={{ForumName}} value={{ForumValue}} checked />
    <span class="ToggleButton">{{ ForumTitle }} </span>
  </label>
</template>

<script>
export default 
{
    props:['ForumName','ForumValue','ForumTitle'],
};
</script>

<style scoped>
 @import '../assets/styles/ForumStyles.css';
</style>