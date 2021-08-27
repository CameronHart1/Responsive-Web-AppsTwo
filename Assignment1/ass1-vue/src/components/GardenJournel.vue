<template>
  <div style="width:100%; padding-right: 5px;">
    <h2 style="text-align:center; margin-bottom:20px;">Garden journel</h2>

    <div id="JournalBod">
      <JournEntry
        v-for="ent in PlantEntries"
        :PlName="ent.PlName"
        :Entry="ent.Entry"
        :key="ent.id"
      >
      </JournEntry>
    </div>
  </div>
</template>

<script>
import JournEntry from "./JournalEntry.vue";

export default {
  data() {
    return {
      PlantEntries: [
        { PlName: "Hybiscus", Entry: "water daily" },
        { PlName: "unknown pot plant", Entry: "move into sun for an hour" },
      ],
    };
  },
  components: { JournEntry },
};
</script>