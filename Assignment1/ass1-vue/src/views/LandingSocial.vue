<template>

    <button class="SearchButton"> Search </button>

    <div class="ForumBox">

        <ForumCat ForumTitle="My Forums" ForumName="Forum" ForumValue="My"></ForumCat>
        <ForumCat ForumTitle="Feed" ForumName="Forum" ForumValue="Feed"></ForumCat>
        <ForumCat ForumTitle="Groups" ForumName="Forum" ForumValue="Groups"></ForumCat>
    </div>

    <div>
        <div id="Lines"></div>
        <div id="ForumEntries">
        </div>
    </div>
</template>

<script>
import ForumCat from '../components/ForumCatagory.vue'

export default {
    components:{ForumCat}
}
</script>

<style scoped>
@import '../assets/styles/ForumStyles.css'
</style>