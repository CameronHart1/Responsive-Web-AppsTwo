<template>
<!-- the view that holds the GardenPLan and GardenJournal -->
    <div id="GardenFlex">
    <GJ> </GJ>
    <GP> </GP>
    </div>
</template>

<script>
import GJ from "../../../components/GardenJournel.vue";
import GP from "../../../components/GardenPlan.vue";

export default {
  components: { GJ, GP },
};
</script>