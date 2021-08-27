<template>
  <div
    class="JournalDiv"
    style="border-bottom: 2px solid #211b0a20; border-radius: 2px"
  >
    <h3
      style="
        margin: 0;
        width: 25%;
        border-right: 2px solid #211b0a20;
        border-radius: 2px;
      "
    >
      {{ PlName }}
    </h3>
    <p style="margin: 0; width: 75%; padding-left: 10px"> {{ Entry }} </p>
  </div>
</template>
<script>
export default {
  props: {
    PlName: String,
    Entry: String,
  },
};
</script>